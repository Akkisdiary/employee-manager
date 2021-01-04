from allauth.account.adapter import DefaultAccountAdapter


class ManagerAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.address = data.get('first_name')
        user.address = data.get('last_name')
        user.address = data.get('address')
        user.dob = data.get('dob')
        user.company = data.get('company')
        user.mobile = data.get('mobile')
        user.city = data.get('city')
        user.save()
        return user
