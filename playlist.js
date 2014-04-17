angular.module("ballin.playlist", [])
	// dependency inject everything so you can safely ugly, so keep $scope there
	.controller("ballin.playlistControl", ["$scope", "ballin.playlistApi", function($scope, plApi) {
		$scope.defaultDisplay = 'Loading..';
		plApi.getPlaylists().then(
			function(response) {
				$scope.playlists = response.data.playlists;
				console.log(JSON.stringify($scope.playlists));
			},
			function(error) {
				console.log("bad shit");
				console.log(JSON.stringify(error));
				$scope.defaultDisplay = 'oh noes';
			}
		);
	}])
	.factory("ballin.playlistApi", ["$http", "$q", function($http, $q) {
		var private = 'cant touch this';

		return {
			getPlaylists: function() {
				var deferred = $q.defer();

				deferred.resolve({ data: {
					playlists: [
						{
							name: 'Ten Walls',
							songs: [
								{id: 1, name: 'gotham', artist: '10 walls', url: 'http://tenwalls'},
								{id: 2, name: 'epos', artist: '10 walls', url: 'http://tenwalls'},
								{id: 3, name: 'moag', artist: '10 walls', url: 'http://tenwalls'}
							]
						}
					]
				}});

				// deferred.reject({
		  //           status: 403,
	   //          	msg: 'not authed'
				// });
				return deferred.promise;

				// return $http.get('https://myserver/playlists').then();
			}
		};
	}])
;