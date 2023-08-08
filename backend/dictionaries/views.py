from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView,CreateAPIView
# from rest_framework.mixins import CreateModelMixin
from .serializers import DictionarySerializer, WordSerializer, CategorySerializer
from .models import Dictionary, Word, Category
from rest_framework.pagination import LimitOffsetPagination,PageNumberPagination
from django.db.models import Q
from authentication.models import User
class DictionaryListView(APIView,LimitOffsetPagination):
    def get(self, request, *args, **kwargs):
        version = request.version
        username = kwargs.get("username")
        search = request.query_params.get('search',"")
        queryset = Dictionary.objects.filter(Q(name__icontains=search) | Q(language__icontains=search) | Q(created_by__username__icontains=search))
        if username:
            queryset = queryset.filter(Q(created_by__username=username))
        else:
            queryset = queryset.filter(Q(public=True) | Q(created_by__username=request.user.username))
            # dictionaries = Dictionary.objects.filter(Q(created_by=user_id),Q(name__icontains=search) | Q(language__icontains=search)).all()
        dictionaries = queryset.order_by("-id").all()
        self.max_limit = 20 # Pagination Limit
        result_page = self.paginate_queryset(dictionaries, request,view=self)
        serializer = DictionarySerializer(result_page,many=True)
        return self.get_paginated_response(serializer.data)

    def post(self,request, *args, **kwargs):
        version = request.version
        username = kwargs.get("username")
        print("AA",request.user.username)
        if(request.user.username == username):
            data = request.data
            serializer = DictionarySerializer(data=data,context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    



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
        dictionary_id = kwargs.get("dictionary_id")
        dictionary = Dictionary.objects.filter(id=dictionary_id).first()

        if not dictionary:
            return Response({"detail":"Dictionary not found!"},status=status.HTTP_404_NOT_FOUND)

        queryset = Word.objects.filter(
            Q(word__icontains=search) | 
            Q(translation__icontains=search) | 
            Q(created_by__username__icontains=search) |
            Q(sentence__icontains=search) |
            Q(sentence_translation__icontains=search)
        )


        if(request.user != dictionary.created_by):
            queryset = queryset.filter(Q(public=True))
        queryset = queryset.filter(dictionary=dictionary)
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
        
        serializer = WordSerializer(data=data,context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class DictionaryDetailView(APIView):
    def get(self, request, *args, **kwargs):
        version = request.version
        user_id = kwargs.get("user_id")

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
        user_id = kwargs.get("user_id")
    