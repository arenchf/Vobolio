from django.contrib import admin
from .models import Dictionary, Category, Word
from django.urls import reverse
from django.utils.html import format_html


class DictionaryAdmin(admin.ModelAdmin):
    list_display=["id","name","created_by","created_at","language"]
    list_display_links=["id","name"]
    list_filter = ("language","created_at")
    ordering = ("-created_at",)
    search_fields = ['name',"language","created_at","created_by__username"]
    save_as = True

class WordAdmin(admin.ModelAdmin):
    list_display=["word","translation","get_categories","link_to_user","link_to_dictionary","progress","earned"]
    list_display_links=["word","translation"]
    ordering = ("created_by","-dictionary",'word')
    list_filter = ("earned","created_at")
    filter_horizontal = ("categories",)
    search_fields = ['word',"translation","created_at","created_by__username","dictionary__name","dictionary__language"]

    def get_categories(self,obj):
        return "\n".join([category.name for category in obj.categories.all()])
    get_categories.short_description = 'Categories'


    @admin.display(ordering="created_by")
    def link_to_user(self, obj):
        link = reverse("admin:authentication_user_change", args=[obj.created_by.id])
        return format_html('<a href="{}">{}</a>', link, obj.created_by)
    
    link_to_user.short_description = 'Created By'
    
    @admin.display(ordering="dictionary")
    def link_to_dictionary(self, obj):
        link = reverse("admin:dictionaries_dictionary_change", args=[obj.dictionary.id])
        return format_html('<a href="{}">{}</a>', link, obj.dictionary)
    
    link_to_dictionary.short_description = 'Dictionary'
    

admin.site.register(Dictionary,DictionaryAdmin)
admin.site.register(Category)
admin.site.register(Word,WordAdmin)