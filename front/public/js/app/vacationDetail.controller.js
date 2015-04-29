(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('vacationDetailController', VacationDetailController);

	VacationDetailController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'$stateParams',
		'$http',
		'Vacation',
		'Photo'
	];

	function VacationDetailController($scope, $rootScope, $state, $stateParams, $http, Vacation, Photo) {
		$scope.pictures = [];
		$scope.files = [];
		$scope.chunkedData = [];

		$scope.refresh = refresh;
		$scope.upload = upload;
		$scope.filePath = filePath;
		$scope.chunk = chunk;
		$scope.setTempId = setTempId;
		$scope.captionSubmitted = captionSubmitted;

		$scope.vacation = Vacation.get({id: $stateParams.id}, $scope.refresh);

		$('#captionDetailModal').on('shown.bs.modal', function() {
	        $('input:text:visible:first').focus();
	    });

		$scope.$watch('files', function () {
	        if ($scope.files) {
	            $scope.upload($scope.files);
	        }
    	});

		function filePath(file) {
			return file.slice(8);
		};

    	function upload(files) {
    		if (files && files.length) {
	            var fd = new FormData();
	            for (var i = 0; i < files.length; i++) {
	                var file = files[i];
	                fd.append("fileupload", file);
	            }
	            $http.post('/api/v1/photo', fd, {
	                withCredentials: true,
	                headers: {'Content-Type': undefined },
	                transformRequest: angular.identity
	            }).success(function(data) {
	                $scope.files = [];
	                $scope.refresh();
	            });
	        }
    	};

		function refresh() {
			$scope.tempId = "";
			$http.get('/api/v1/vacation/' + $stateParams.id + '/photo').then(
				function(response) {
					$scope.pictures = response;
					$scope.chunkedData = chunk($scope.pictures.data, 3);
				}, function(error) {
					console.log(error);
				});
		};

		function chunk(arr, size) {
			var newArr = [];
			for (var i = 0; i < arr.length; i+=size) {
				newArr.push(arr.slice(i, i + size));
			}
			return newArr;
		};

		function setTempId(pictureId) {
			$scope.tempId = pictureId;
		};

		function captionSubmitted(caption) {
			$('#captionDetailModal').modal('hide');
			Photo.update({id: $scope.tempId}, {caption: caption}, $scope.refresh);
		};
	}
})();