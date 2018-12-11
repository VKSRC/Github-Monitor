import redis
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from ..models.token import Token


class TokenSerializer(serializers.ModelSerializer):
    value = serializers.SlugField(
        required=True, max_length=40, min_length=40, validators=[UniqueValidator(queryset=Token.objects.all())]
    )

    class Meta:
        model = Token
        fields = (
            'id', 'value'
        )
