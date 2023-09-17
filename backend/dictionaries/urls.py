from django.urls import path

from .views import DictionaryListView, DictionaryDetailView, WordActionView, WordListView, WordDetailView,CategoryListView,TrainingActiviyView

urlpatterns = [
    path('users/<str:username>/dictionaries/', DictionaryListView.as_view()),
    path('users/<str:username>/activity/', TrainingActiviyView.as_view()),
    # path('dictionaries/', DictionaryListView.as_view()),
    # path('users/<uuid:user_id>/dictionaries/<uuid:directory_id>/', DictionaryListView.as_view()),
    # path('users/<uuid:user_id>/dictionaries/<uuid:directory_id>/words/', DictionaryListView.as_view()),
    # path('users/<uuid:user_id>/dictionaries/<uuid:directory_id>/words/<uuid:word_id>', DictionaryListView.as_view()),
    path('words/<int:word_id>/', WordDetailView.as_view()),
    path('dictionaries/<int:dictionary_id>/words/', WordListView.as_view()),
    path('dictionaries/<int:dictionary_id>/', DictionaryDetailView.as_view()),
    path('dictionaries/<int:dictionary_id>/categories/', CategoryListView.as_view()),
    path('word/action/',WordActionView.as_view())

    # path('')

    # path('', DictionaryView.as_view()),

]