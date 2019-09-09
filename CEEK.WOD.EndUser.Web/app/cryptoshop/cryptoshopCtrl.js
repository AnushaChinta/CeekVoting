var dependencies = ['main', 'cryptoshop/cryptoshopFactory'];
define(dependencies, function (app, cryptoshopFactory) {
    app.controller("cryptoshopCtrl", function ($scope, $state, $rootScope, $stateParams, cryptoshopFactory, $location) {
        'use strict';
        $scope.$parent.isArtist = true;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        var stripe = Stripe(cryptoshopFactory.stripekey);
        var elements = stripe.elements();

        // Custom styling can be passed to options when creating an Element.
        // (Note that this demo uses a wider set of styles than the guide below.)
        var style = {
            base: {
                color: 'black',
                lineHeight: '20px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: 'red',
                iconColor: '#fa755a'
            }
        };

        // Create an instance of the card Element.
        var card = elements.create('card', { style: style });
        card.hidePostalCode = true;

        $scope.message1 = "";
        $scope.img = true;
        $scope.img1 = false;
        $scope.showimg = false;
        //var cardNumber = elements.create('cardNumber');
        //cardNumber.mount('#card-number');
        //var cardExpiry = elements.create('cardExpiry');
        //cardExpiry.mount('#card-expiry');
        //var cardCvc = elements.create('cardCvc');
        //cardCvc.mount('#card-cvc');


        $scope.serverURL = cryptoshopFactory.fileserverURL;
        $scope.paymentsuccessmodel = cryptoshopFactory.paymentsuccessmodel();
        $scope.paymodel = cryptoshopFactory.paymodel();
        $scope.promocodemodel = cryptoshopFactory.promocodemodel();


        $scope.model = cryptoshopFactory.mockData();
        $scope.selectedPackage = null;

        //-----------------------------
        //-------UI functions-----------------------------------------------------------------------------------------
        //-----------------------------

        // Variables
        $scope.showPaymentPopup = false;
        $scope.level2 = false;
        $scope.paymodel1 = {};
        //Initalize Payments
        var oninitalpaySuccess = function (response) {
            $scope.$parent.showLoading = false;

            //  console.log("oninitalpaySuccess:", JSON.stringify(response));
            $scope.paymodel1 = response.data.message[0].cvr_insert_paymentdetails;
            $scope.paymodel1.ceek_points = $scope.paymodel1.ceek_points.toFixed(2);
        };

        var oninitalpayError = function (response) {

            try {
                if (response.message = "reserve address does not have CEEK balace.")
                    $scope.message = "Reserve address does not have required CEEK balance. Please contact admin.";
                else
                    $scope.message = "Failed to calculate ceek points";
                console.log("oninitalpayError:", JSON.stringify(response));
                $scope.$parent.showLoading = false;
            } catch (e) {
                $scope.message = "Failed to calculate ceek points";
                $scope.$parent.showLoading = false;

            }


        };

        var onpromocodeSuccess = function (response) {
            $scope.msg = true;
            //  console.log("onpromocodeSuccess:", JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.promocodesuccess = response.data.message[0].cvr_update_paymentdetails;
            $scope.promocodesuccess.ceek_points = $scope.promocodesuccess.ceek_points.toFixed(2);
            debugger;
            $rootScope.$emit("RefreshWalletBalance", {});
        };
        var onpromocodeError = function (response) {

            $scope.errormessage = "Invalid promocode";
            console.log("onpromocodeError:", JSON.stringify(response));
            $scope.$parent.showLoading = false;


        };
        $scope.MSG = function () {
            $scope.errormessage = "";
        }
        // Payment Popup
        $scope.OpenPaymentPopup = function (x) {
            $scope.$parent.showLoading = true;
            $scope.message1 = "";
            $scope.message = "";
            // Add an instance of the card Element into the `card-element` <div>.
            card.mount('#card-element');
            card.clear();
            document.getElementById("form").reset();
            $scope.selectedPackage = x;
            $scope.showPaymentPopup = true;
            $scope.level1 = true;
            $scope.level2 = false;
            $scope.level3 = false;
            $scope.level4 = false;
            $scope.level5 = false;
            $scope.showimg = false;
            $scope.img = true;
           // document.getElementById('id01').style.display = 'block';
            $scope.paymodel.ceek_userid = $scope.$parent.ceek_userid;
            $scope.paymodel.ceek_points = 0;
            var payM = $scope.paymodel;
            payM.amount = $scope.selectedPackage.packageCost * 100;

            cryptoshopFactory.initialpayment($scope.paymodel).then(oninitalpaySuccess, oninitalpayError);
            $scope.paymodel1 = {};
            $scope.getCheckedTrue = function () {
                return false;
            };
            $scope.form.submitted = false;
            $scope.form1.submitted = false;
        };

        $scope.ClosePaymentPopup = function () {
            $scope.showVotePopOverId = 0;
            $scope.showPaymentPopup = false;
           // document.getElementById('id01').style.display = 'none';
            // $scope.getall_subplans();
            $scope.form.submitted = false;
            $scope.form1.submitted = false;

            $scope.reset();
        };

        $scope.Close = function () {
            $scope.level2 = true;
            $scope.level4 = false;
            $scope.level1 = false;
            $scope.level3 = false;
            $scope.submit1 = true;
            $scope.submit = false;
            $scope.img = false;
            $scope.img1 = false;
            $scope.showimg = true;
            $scope.form1.submitted = false;
            document.getElementById("form1").reset();
        }

        var onpaymentSuccess = function (response) {
            $scope.$parent.showLoading = false;
            document.getElementById("form").reset();
            //console.log(JSON.stringify(response));

            $scope.successmodel = response.data.message.root;
            $scope.level2 = false;
            $scope.level3 = true;
            $scope.level4 = false;
            $scope.level5 = false;            
            debugger;
            $rootScope.$emit("RefreshWalletBalance", {});

            setTimeout(function () { $location.path('artist') }, 10000);


        };

        var onpaymentError = function (response) {

            //console.log(JSON.stringify(response));
            $scope.message1 = "Payment failed";
            $scope.$parent.showLoading = false;
        };

        $scope.redeem = function (form1) {
            if ($scope.form1.$valid) {
                $scope.msg = false;
                var promo = $scope.promocodemodel;
                promo.id = $scope.promomodel.id;
                promo.ceek_userid = $scope.$parent.ceek_userid;
                $scope.token = sessionStorage.getItem("token");
                promo.paymenttoken = $scope.token;

                $scope.$parent.showLoading = true;
                cryptoshopFactory.promocode(promo).then(onpromocodeSuccess, onpromocodeError);
            }
            else {
                $scope.form1.submitted = true;
            }
        }
        var oninitalpromoError = function (response) {

            //console.log(JSON.stringify(response));
            $scope.errormessage1 = "Failed to load ceek points";
            $scope.$parent.showLoading = false;
        };
        var oninitalpromoSuccess = function (response) {

            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.promomodel = response.data.message[0].cvr_insert_paymentdetails;
            $scope.promomodel.ceek_points = $scope.promomodel.ceek_points.toFixed(2);
            $scope.img = false;
            $scope.showimg = false;
            $scope.img1 = true;
        };
        $scope.promo = function () {
            $scope.level1 = false;
            $scope.level2 = false;
            $scope.level4 = true;
            $scope.level5 = false;
            $scope.errormessage = "";
            document.getElementById("form1").reset();
            $scope.form.submitted = false;
            $scope.form1.submitted = false;
            $scope.$parent.showLoading = true;
            $scope.paymodel.ceek_userid = $scope.$parent.ceek_userid;
            $scope.paymodel.ceek_points = 0;
            var payM = $scope.paymodel;
            payM.amount = "";
            payM.paymenttype = "promo_code";
            cryptoshopFactory.initialpayment($scope.paymodel).then(oninitalpromoSuccess, oninitalpromoError);
            $scope.paymodel = {};
            $scope.form1.$setUntouched();

        }

        var oncreatestripeSuccess = function (response) {
            // $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            $scope.successmodel = response.data.message;

            stripe.createToken(card).then(stripeCreateToken);


        };
        var stripeCreateToken = function (response) {
            //debugger;
            $scope.$parent.showLoading = true;
            var payM = $scope.paymentsuccessmodel;
            payM.amount = parseInt($scope.selectedPackage.packageCost * 100);
            payM.id = $scope.paymodel1.id;
            payM.ceek_userid = $scope.$parent.ceek_userid;
            payM.paymenttoken = response.token.id;
            cryptoshopFactory.payment(payM).then(onpaymentSuccess, onpaymentError);

        }
        var oncreatestripeError = function (response) {
            //console.log(JSON.stringify(response));
            $scope.message1 = "Payment failed";
            $scope.$parent.showLoading = false;
        };


        //payment success
        $scope.Save = function (form) {

            if ($scope.form.$valid) {

                stripe.createToken(card).then(stripeCreateTokenCallback);
            }
            else {
                $scope.form.submitted = true;
            }



        }

        var stripeCreateTokenCallback = function (response) {
            //debugger;
            $scope.$parent.showLoading = true;
            console.log(response);
            if (response.error) {
                // Inform the user if there was an error.
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = response.error.message;
                $scope.$parent.showLoading = false;
            } else {

                console.log("paymentmodel", $scope.paymentsuccessmodel);
                var payM = $scope.paymentsuccessmodel;
                payM.country = $scope.country.countryname;
                payM.state = $scope.state.statename;
                payM.city = $scope.city.cityname;
                payM.amount = parseInt($scope.selectedPackage.packageCost * 100);
                payM.id = $scope.paymodel1.id;
                payM.ceek_userid = $scope.$parent.ceek_userid;
                payM.paymenttoken = response.token.id;
                payM.paymentby = "";

                if (payM.issave) {
                    payM.issave = payM.issave.toString();
                    payM.paymentby = "savedcard";
                    $scope.getCheckedTrue = function () {
                        return true;
                    };
                    cryptoshopFactory.createstripe(payM).then(oncreatestripeSuccess, oncreatestripeError);
                }
                else {

                    cryptoshopFactory.payment(payM).then(onpaymentSuccess, onpaymentError);
                }

            }


        }
        $scope.Savedcard = function (form2) {
            if ($scope.form2.$valid) {
                $scope.$parent.showLoading = true;
                var payM = $scope.paymodel2;
                if ($scope.country.countryname)
                    payM.country = $scope.country.countryname;
                if ($scope.state.statename)
                    payM.state = $scope.state.statename;
                if ($scope.city.cityname)
                    payM.city = $scope.city.cityname;
                payM.amount = parseInt($scope.selectedPackage.packageCost * 100);
                payM.id = $scope.paymodel1.id;
                payM.ceek_userid = $scope.$parent.ceek_userid;
                payM.paymentby = "savedcard";
                cryptoshopFactory.payment(payM).then(onpaymentSuccess, onpaymentError);

            } else {
                $scope.form2.submitted = true;
            }
        }

        var ongetstripedetailsSuccess = function (response) {
            $scope.$parent.showLoading = false;
            // console.log("ongetstripedetailsSuccess:", JSON.stringify(response));
            $scope.model1 = response.data.message;
            $scope.paymodel2 = $scope.model1.DBcardinfo[0].cardinfo[0];
            $scope.paymodel2.emailid = $scope.model1.email;

            $scope.state = $scope.paymodel2.state;
            $scope.city = $scope.paymodel2.city;
            $scope.country = $scope.paymodel2.country;
            var payment = $scope.model1.sources.data[0];
            $scope.carddetails = payment;
            $scope.cardnum = "XXXXXXXX" + $scope.carddetails.last4;
            var cardnum = $scope.cardnum;
            $scope.level5 = true;
            $scope.level2 = false;

            $scope.showcard = true;
            $scope.submit = true;
            $scope.submit1 = false;

        };

        var ongetstripedetailsError = function (response) {
            $scope.$parent.showLoading = false;
            console.log("ongetstripedetailsError:", JSON.stringify(response));
            $scope.level5 = false;
            $scope.level2 = true;
            $scope.showcard = false;

        };

        //saved card details
        $scope.getstripedetails = function () {
            $scope.$parent.showLoading = true;

            cryptoshopFactory.stripecarddetails({ ceek_userid: $scope.$parent.ceek_userid }).then(ongetstripedetailsSuccess, ongetstripedetailsError);

        };

        //GET ALL SUBSCRIPTION PLANS

        var onGetall_subplansSuccess = function (response) {
            $scope.$parent.showLoading = false;
            // console.log("onGetall_subplansSuccess : ", response);
            if (response.data.message != "") {


                $scope.packageList = response.data.message["0"].cvr_getallsubscriptionplans;
                if (typeof ($scope.packageList) != 'undefined') {
                    for (var i = 0; i < $scope.packageList.length; i++) {
                        if ($scope.packageList[i].packageImageUrl == "") {
                            $scope.packageList[i].fullimageurl = 'img/user-placeholder.png';
                        } else {
                            $scope.packageList[i].fullimageurl = $scope.serverURL + $scope.packageList[i].packageImageUrl;
                        }
                    }
                }


                //console.log("packageList : ", $scope.packageList);

            }

        };

        var onGetall_subplansError = function (response) {
            console.log("onGetall_subplansError:", JSON.stringify(response));
            $scope.message2 = "Failed to load plans";

            $scope.$parent.showLoading = false;

        };

        $scope.getall_subplans = function () {

            $scope.$parent.showLoading = true;
            cryptoshopFactory.getALLSubscriptionPlans().then(onGetall_subplansSuccess, onGetall_subplansError);
        };

        // $scope.showcard = false;
        $scope.savecard = function () {
            $scope.showcard = true;
            $scope.level2 = false;
            $scope.level5 = true;
            $scope.submit = true;
            $scope.submit1 = false;
            document.getElementById("form").reset();
            $scope.form.submitted = false;
            $scope.form1.submitted = false;
            $scope.state = {};
            $scope.country = {};
            $scope.city = {};
        }
        $scope.newcard = function () {
            $scope.showcard = true;
            $scope.level2 = true;
            $scope.level5 = false;
            $scope.submit = false;
            $scope.submit1 = true;
            $scope.form1.submitted = false;
            $scope.state = {};
            // $scope.country = {};
            $scope.city = {};
            $scope.countries();
        }

        $scope.pay = function () {
            $scope.level1 = false;
            $scope.level2 = true;
            $scope.level4 = false;
            $scope.level5 = false;
            $scope.getstripedetails();
            $scope.state = {};
            $scope.country = {};
            $scope.city = {};
            $scope.countries();
            $scope.img = false;
            $scope.showimg = true;
        }


        $scope.reset = function () {
            $scope.paymentsuccessmodel = cryptoshopFactory.paymentsuccessmodel();
            $scope.form.$setUntouched();
        };


        $scope.move_up = function () {
            $('#list').animate({ scrollTop: '400px' }, 800);
        }
        $scope.move_down = function () {
            $('#list').animate({ scrollTop: '0px' }, 800);

        }

        $scope.getall_subplans();

        $scope.country = {};
        $scope.state = {};
        $scope.city = {};
        var onGetcountryError = function (response) {
            //  console.log("onGetcountryError:", JSON.stringify(response));

            $scope.$parent.showLoading = false;

        };
        var onGetcountrySuccess = function (response) {
            $scope.$parent.showLoading = false;

            if (response.data.message != "") {

                $scope.countryList = response.data.message["0"].cvr_getcountries;
                for (var i = 0; i < $scope.countryList.length; i++) {
                    if ($scope.countryList[i].countryname == "United States") {
                        $scope.country = $scope.countryList[i].countryname;
                        angular.forEach($scope.countryList, function (value, key) {
                            if (value.countryname == $scope.country)
                                $scope.country = value;
                        });
                        $scope.countryChanged();
                    }

                }


            }

        };
        var onGetstateError = function (response) {
            //  console.log("onGetstateError:", JSON.stringify(response));

            $scope.$parent.showLoading = false;

        };
        var onGetstateSuccess = function (response) {
            $scope.$parent.showLoading = false;

            if (response.data.message != "") {

                $scope.stateList = response.data.message["0"].cvr_getstates;


            }

        };
        var onGetcityError = function (response) {

            $scope.$parent.showLoading = false;

        };
        var onGetcitySuccess = function (response) {
            $scope.$parent.showLoading = false;

            if (response.data.message != "") {

                $scope.cityList = response.data.message["0"].cvr_getcities;


            }

        };
        $scope.countryChanged = function () {

            for (var i = 0 ; i < $scope.countryList.length; i++) {

                var countryListdata = $scope.countryList[i];
                if (countryListdata.id == $scope.country.id) {
                    cryptoshopFactory.state({ "country_id": $scope.country.id }).then(onGetstateSuccess, onGetstateError);

                }
            }


            $scope.cityList = {};
            $scope.city = {};
            $scope.state = {};

        };
        $scope.stateChanged = function () {

            for (var i = 0 ; i < $scope.stateList.length; i++) {

                var stateListdata = $scope.stateList[i];
                if (stateListdata.id == $scope.state.id) {
                    cryptoshopFactory.city({ "state_id": $scope.state.id }).then(onGetcitySuccess, onGetcityError);

                }
            }


        };
        $scope.countries = function () {
            cryptoshopFactory.country().then(onGetcountrySuccess, onGetcountryError);
        }





    });
});