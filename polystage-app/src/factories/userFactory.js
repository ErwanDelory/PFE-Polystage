factory('userFactory', function ($http) {
  return {
    connexion: function (identifiant, password) {
      return $http({
        method: 'GET',
        url: 'http://localhost:8080/authentification',
        params: { "username": identifiant, "password": sha512(password) }
      })
    }
  }
})