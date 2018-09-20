import redis
from rest_framework import serializers
from ..models.token import Token

RS = redis.Redis()


class TokenSerializer(serializers.ModelSerializer):
    value = serializers.CharField(max_length=40, required=True, allow_null=False)

    class Meta:
        model = Token
        fields = (
            'id', 'value'
        )

    def validate_value(self, value):
        if Token.objects.filter(value=value).count():
            raise serializers.ValidationError('Token已存在')
        if len(value) != 40:
            raise serializers.ValidationError('Token长度应为40位')
        return value
