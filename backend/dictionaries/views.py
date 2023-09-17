from datetime import datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import DictionarySerializer, TrainingSerializer, WordSerializer,WordCreateSerializer, CategorySerializer, TrainingActivitySerializer
from .models import Dictionary, TrainingDay, Word, Category
from rest_framework.pagination import LimitOffsetPagination,PageNumberPagination
from django.db.models import Q, Max, Count
from django.db.models.functions import Greatest, Cast, TruncDay


class DictionaryListView(APIView,PageNumberPagination):
    # page_size = 10
    def get(self, request, *args, **kwargs):
        version = request.version
        username = kwargs.get("username")
        search = request.query_params.get('search',"")
        sort = request.query_params.get('sort',"last")
        queryset = Dictionary.objects.filter(Q(name__icontains=search) | Q(language__icontains=search) | Q(categories__name__icontains=search))
        # queryset = Dictionary.objects.filter(Q(name__icontains=search) | Q(language__icontains=search) | Q(created_by__username__icontains=search) | Q(categories__name__icontains=search))
        if username:
            queryset = queryset.filter(Q(created_by__username=username))
        else:
            queryset = queryset.filter(Q(public=True) | Q(created_by__username=request.user.username))
            # dictionaries = Dictionary.objects.filter(Q(created_by=user_id),Q(name__icontains=search) | Q(language__icontains=search)).all()
        
        if sort == "last":
            # queryset = queryset.order_by("updated_at")
            # queryset = queryset.annotate(last_used=Max("words__updated_at")).order_by("last_used")
            queryset = queryset.annotate(last_word_update=Max("words__updated_at")).annotate(latest_activity_at=Greatest("last_word_update","created_at")).order_by("-latest_activity_at")
        elif sort == "new":
            queryset = queryset.order_by("-created_at")
        elif sort == "old":
            queryset = queryset.order_by("created_at")
        elif sort == "words":
            # queryset = queryset.order_by("created_at")
            queryset = queryset.annotate(Count("words")).order_by("-words__count")
            # queryset = queryset.annotate(word_count=Count("words")).order_by("words")

        dictionaries = queryset.all()   
        print("aaa")
        print(dictionaries) 
        print("bbb")
        # print(dictionaries[1].words__count)
        result_page = self.paginate_queryset(dictionaries, request,view=self)

        print(result_page)
        print(len(result_page))
        serializer = DictionarySerializer(result_page,many=True)
        return self.get_paginated_response(serializer.data)

    def post(self,request, *args, **kwargs):
        version = request.version
        username = kwargs.get("username")
        if(request.user.username == username):
            data = request.data
            serializer = DictionarySerializer(data=data,context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    

class TrainingActiviyView(APIView):
    def get(self,request,*args,**kwargs):
        version = request.version
        username = kwargs.get("username")
        # training_activity = TrainingDay.objects.annotate(day=TruncDay("created_at")).values("day").annotate(c=Count("right_answers")).all()
        training_activity = TrainingDay.objects.filter(created_by__username=username).all()
        print(training_activity)
        serializer = TrainingActivitySerializer(training_activity,many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

class WordActionView(APIView):




    def post(self,request,*args,**kwargs):
        version = request.version
        data = request.data
        serializer = TrainingSerializer(data=data)
        if serializer.is_valid():
            today = datetime.today()
            queryset = TrainingDay.objects.filter(created_at__day=today.day)

            action = serializer.data["action"]
            match action:
                case "success":
                    word = serializer.validated_data["word"]
                    queryset = queryset.filter(created_by=request.user).filter(dictionary=word.dictionary)
                    training = queryset.first()
                    if(not training):
                        training = TrainingDay(created_by=request.user,dictionary=word.dictionary)
                        training.save()
                    
                    if(word.progress + request.user.difficulty >= 100):
                        word.progress = 100
                        word.earned = True
                    else:
                        word.progress += request.user.difficulty
                        if(word.earned):
                            word.earned = False
                    word.save()
                    training.right_answers += 1
                    training.save()
                case "reset":
                    word = serializer.validated_data["word"]
                    word.progress = 0
                    word.earned = False
                    word.save()
               
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class CategoryListView(APIView,LimitOffsetPagination):
    def get(self, request, *args, **kwargs):
        version = request.version
        search = request.query_params.get('search',"")
        dictionary_id = kwargs.get("dictionary_id")
        dictionary = Dictionary.objects.filter(id=dictionary_id).first()
        
        if not dictionary:
            return Response({"detail":"Dictionary not found!"},status=status.HTTP_404_NOT_FOUND)
        
        if(request.user != dictionary.created_by and not dictionary.public):
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        queryset = Category.objects.filter(Q(name__icontains=search))
        queryset = queryset.filter(dictionary=dictionary)

        categories = queryset.all()
        # self.max_limit = 20 # Pagination Limit
        result_page = self.paginate_queryset(categories, request,view=self)
        serializer = CategorySerializer(result_page,many=True)
        return self.get_paginated_response(serializer.data)

    def post(self,request, *args, **kwargs):
        version = request.version
        data = request.data
        dictionary_id = kwargs.get("dictionary_id")

        dictionary = Dictionary.objects.get(pk=dictionary_id)

        if not dictionary:
            Response({"detail":"Dictionary not found"},status=status.HTTP_404_NOT_FOUND)
        
        if dictionary.created_by != request.user:
            Response(status=status.HTTP_403_FORBIDDEN)


        data["dictionary"] = dictionary.id
        serializer = CategorySerializer(data=data,context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        
class WordListView(APIView,LimitOffsetPagination):
    def get(self, request, *args, **kwargs):
        version = request.version
        search = request.query_params.get('search',"")
        sort = request.query_params.get('sort',"last")
        filter = request.query_params.get('filter',None)
        dictionary_id = kwargs.get("dictionary_id")
        dictionary = Dictionary.objects.filter(id=dictionary_id).first()

        if not dictionary:
            return Response({"detail":"Dictionary not found!"},status=status.HTTP_404_NOT_FOUND)
        
        queryset = Word.objects.filter(dictionary=dictionary)
        if filter == "complete":
            queryset = queryset.filter(earned=True)
        if filter == "incomplete":
            queryset = queryset.filter(earned=False)

        filter_args = (Q(word__icontains=search) | 
            Q(translation__icontains=search) | 
            Q(created_by__username__icontains=search) |
            Q(sentence__icontains=search) |
            Q(sentence_translation__icontains=search) |
            Q(categories__name__icontains=search))
        
        try:
            filter_args |= Q(progress=int(search))
        except ValueError:
            pass

        queryset = queryset.filter(filter_args)
        

        if(request.user != dictionary.created_by):
            queryset = queryset.filter(Q(public=True))

        if sort == "last":
            queryset = queryset.order_by("-updated_at")
        elif sort == "new":
            queryset = queryset.order_by("-created_at")
        elif sort == "old":
            queryset = queryset.order_by("created_at")
        elif sort == "highest":
            queryset = queryset.order_by("-progress")
        elif sort == "lowest":
            queryset = queryset.order_by("progress")

        
        words = queryset.all()
        self.max_limit = 20 # Pagination Limit
        result_page = self.paginate_queryset(words, request,view=self)
        serializer = WordSerializer(result_page,many=True)
        return self.get_paginated_response(serializer.data)
    

    def post(self,request, *args, **kwargs):
        version = request.version
        data = request.data
        dictionary_id = kwargs.get("dictionary_id")
        dictionary = Dictionary.objects.get(pk=dictionary_id)
        if not dictionary:
            Response({"detail":"Dictionary not found"},status=status.HTTP_404_NOT_FOUND)
        if dictionary.created_by != request.user:
            Response(status=status.HTTP_403_FORBIDDEN)

        data["dictionary"] = dictionary.id
        
        serializer = WordCreateSerializer(data=data,context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class DictionaryDetailView(APIView):
    def get(self, request, *args, **kwargs):
        version = request.version
        user_id = kwargs.get("username")
        dictionary_id = kwargs.get("dictionary_id")
        dictionary = Dictionary.objects.get(pk=dictionary_id)
        if not dictionary:
            Response({"detail":"Dictionary not found"},status=status.HTTP_404_NOT_FOUND)

        if not dictionary.public or dictionary.created_by != request.user :
            Response(status=status.HTTP_403_FORBIDDEN)
        serializer = DictionarySerializer(dictionary)
        return Response(serializer.data, status=status.HTTP_200_OK)




        # if(request.user.id)
    def put(self,request,*args,**kwargs):
        version = request.version
        data = request.data
        dictionary_id = kwargs.get("dictionary_id")

        dictionary = Dictionary.objects.get(pk=dictionary_id)

        if not dictionary:
            Response({"detail":"Dictionary not found"},status=status.HTTP_404_NOT_FOUND)
        
        if dictionary.created_by != request.user:
            Response(status=status.HTTP_403_FORBIDDEN)

        serializer = DictionarySerializer(dictionary,data=data,partial=True,context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class WordDetailView(APIView):
    def get(self, request, *args, **kwargs):
        version = request.version

        word_id = kwargs.get("word_id")

        word = Word.objects.get(pk=word_id)
        if(not word):
            Response({"detail":"Word not found"},status=status.HTTP_404_NOT_FOUND)
        
        if(word.created_by != request.user or word.dictionary.public != True):
            Response({"detail":"Word not found"},status=status.HTTP_404_NOT_FOUND)

        serializer = WordSerializer(word)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,*args,**kwargs):
        version = request.version

        word_id = kwargs.get("word_id")

        word = Word.objects.get(pk=word_id)

        if(not word):
            Response({"detail":"Word not found"},status=status.HTTP_404_NOT_FOUND)
        
        if(word.created_by != request.user):
            Response({"detail":"Word not found"},status=status.HTTP_404_NOT_FOUND)
        
        data = request.data
        serializer = WordCreateSerializer(word,data=data,partial=True,context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,*args,**kwargs):
        version = request.version

        word_id = kwargs.get("word_id")
        word = Word.objects.get(pk=word_id)

        if(not word):
            Response({"detail":"Word not found"},status=status.HTTP_404_NOT_FOUND)
        print(word)
        if(word.created_by != request.user):
            Response({"detail":"Word not found"},status=status.HTTP_404_NOT_FOUND)
        
        Word.delete(word)
        return Response(status=status.HTTP_204_NO_CONTENT)