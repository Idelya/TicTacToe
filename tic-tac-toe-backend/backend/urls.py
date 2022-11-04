from backend.gameapp.views import RoomsAPI, CurrentGameAPI, NewGameAPI, JoinGameAPI, UserStatsAPI
from backend.userapp.views import RegisterAPI, UsersAPI, LoginAPI, UserAPI
from django.urls import path
from knox import views as knox_views

urlpatterns = [
    path('api/users/', UsersAPI.as_view({'get': 'list'}), name='users'),
    path('api/user/', UserAPI.as_view(), name='user'),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/game/rooms', RoomsAPI.as_view(), name='rooms'),
    path('api/game/current', CurrentGameAPI.as_view(), name='current_game'),
    path('api/game/new', NewGameAPI.as_view(), name='new_game'),
    path('api/game/stats', UserStatsAPI.as_view(), name='stats'),
    path('api/game/<int:game_id>/', JoinGameAPI.as_view(), name='join'),
]

