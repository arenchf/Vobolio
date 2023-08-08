from rest_framework import serializers
from .models import Dictionary, Category, Word
from django.core.exceptions import ValidationError

class DictionarySerializer(serializers.ModelSerializer):
    total_words = serializers.SerializerMethodField()
    learned_words = serializers.SerializerMethodField()

    class Meta:
        model = Dictionary
        fields = "__all__"
        read_only_fields = ['id',"created_by","created_at"]
        
    def get_total_words(self,instance):
        return instance.words.count()
        
    def get_learned_words(self,instance):
        return instance.words.filter(earned=True).count()
    
    def create(self, validated_data):
        # print(self.context["request"].user)
        dictionary =  Dictionary.objects.create(**validated_data,created_by=self.context["request"].user)
        return dictionary
    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     if representation['is_hidden']:
    #         del (representation["name"],representation["description"],representation["img"],representation["milestones"])

    #     return representation


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ["id"]

class WordSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects)
    # categories = CategorySerializer(many=True)

    class Meta:
        model = Word
        fields = "__all__"
        read_only_fiels = ["id",
                           "created_by",
                           "created_at",
                           "last_progress",
                           "last_decline",
                           "updated_at",
                           ]
    
    def create(self, validated_data):
        # print(validated_data)
        categories = validated_data["categories"]

        validated_data.pop("categories")

        word =  Word.objects.create(**validated_data,created_by=self.context["request"].user)
        for category in categories:
            word.categories.add(category)
        return word
        # return "AAA"