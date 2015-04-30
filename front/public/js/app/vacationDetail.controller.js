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
		'$cookieStore',
		'$interval',
		'Vacation',
		'Photo'
	];

	function VacationDetailController($scope, $rootScope, $state, $stateParams, $http, $cookieStore, $interval, Vacation, Photo) {
		$scope.pictures = [];
		$scope.files = [];
		$scope.chunkedData = [];
		$scope.creator = false;
		$scope.tempPicture = {};
		$scope.pictureLength = $scope.pictures.length;

		$scope.refresh = refresh;
		$scope.upload = upload;
		$scope.filePath = filePath;
		$scope.chunk = chunk;
		$scope.setTempPicture = setTempPicture;
		$scope.captionSubmitted = captionSubmitted;
		$scope.dismissModal = dismissModal;

		$scope.vacation = Vacation.get({id: $stateParams.id}, $scope.refresh);

		$interval($scope.refresh, 5000);

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
			$scope.tempPicture.caption = "";
			$scope.tempPicture._id = 0;

			$scope.creator = ($cookieStore.get('userId') == $scope.vacation.users);

			$http.get('/api/v1/vacation/' + $stateParams.id + '/photo').then(
				function(response) {
					if($scope.pictureLength != response.length) {
						$scope.pictures = response;
						$scope.pictureLength = $scope.pictures.length;
						$scope.chunkedData = chunk($scope.pictures.data, 3);
					}
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

		function setTempPicture(picture) {
			$scope.tempPicture.caption = picture.caption;
			$scope.tempPicture._id = picture._id;
		};

		function captionSubmitted(editedCaption) {
			$('#captionDetailModal').modal('hide');
			Photo.update({id: $scope.tempPicture._id}, {caption: editedCaption}, $scope.refresh);
		};

		function dismissModal() {
			$('#captionDetailModal').modal('hide');
			$scope.refresh();
		};
	}
})();