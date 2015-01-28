window.upp.controller('SignInCtrl',['$scope','$http', function ($scope,$http){

	$scope.signIn = function(){
		$scope.msg = 'clicked';

		$email = "test@test.com";
		$password = "1234";


		// Simple POST request example (passing data) :
		$http.post('/user/signup', {email:$email, password: $password}).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log("todo ok /user/signup");
		    console.log(data);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("FAIL /user/signup");
		  });


	}

}]);