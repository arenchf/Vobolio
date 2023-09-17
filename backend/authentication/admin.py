from django.contrib import admin
from .models import User
from django.contrib.auth.forms import ReadOnlyPasswordHashField, BaseUserCreationForm,UserCreationForm,UsernameField

from django import forms


class UserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ("username","main_language","email","is_staff","is_verified","is_active","groups")
        
        field_classes = {"username": UsernameField}
class MyUserForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(
        label="Password",
        help_text="Raw passwords are not stored, so there is no way to see this user’s password."
    )

    class Meta:
        model = User
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        password = self.fields.get("password")
        if password:
            password.help_text = password.help_text.format(
                f"../../{self.instance.pk}/password/"
            )



class UserAdmin(admin.ModelAdmin):
    # add_form_template = "admin/auth/user/add_form.html"
    list_display = ("username", "email", "is_staff")
    list_filter = ("is_staff", "is_active","is_verified", "groups")
    search_fields = ("username", "email")
    readonly_fields = ("date_joined","last_login","user_permissions","main_language")
    
    # exclude = ("name","location","public","img","main_language","email","username")
    ordering = ("username",)
    form = MyUserForm
    filter_horizontal = (
        "groups",
        "user_permissions",
    )

    def get_form(self, request, obj=None, **kwargs):
        """
        Use special form during user creation
        """
        defaults = {}
        if obj is None:
            defaults["form"] = UserCreationForm
            # kwargs["fields"] =  ("groups","is_staff","is_active","is_verified")
            defaults.update(kwargs)
            # defaults["fields"] =
        else:
            defaults.update(kwargs)
            defaults["fields"] = ("groups","is_staff","is_active","is_verified","date_joined","user_permissions","img")
        # defaults["fields"] = ("username",)
        print("k",kwargs,defaults)
        return super().get_form(request, obj, **defaults)
    
    

admin.site.register(User,UserAdmin)