define("main", ["require", "exports", "aws-amplify"], function (require, exports, aws_amplify_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    aws_amplify_1.default.configure({
        Auth: {
            identityPoolId: 'ap-northeast-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            region: 'ap-northeast-1',
            userPoolId: 'ap-northeast-1_xxxxxxxxx',
            userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
        },
        API: {
            endpoints: [
                {
                    name: "AmplifyTest",
                    endpoint: "https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/v1"
                }
            ]
        }
    });
    var email;
    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $("#register-verify-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(_this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $("#register-verify-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(_this).addClass('active');
        e.preventDefault();
    });
    $('#register-submit').click(function (e) {
        email = $("#register-form #email").val();
        var password = $("#register-form #password").val();
        var comfirm_password = $("#register-form #confirm-password").val();
        if (!email && email == '') {
            alert('メールアドレスを入力してください');
            return;
        }
        if (!password && password == '') {
            alert('パスワードを入力してください');
            return;
        }
        if (password != comfirm_password) {
            alert('確認パスワードが一致しません。');
            return;
        }
        aws_amplify_1.Auth.signUp(email, password)
            .then(function (data) {
            console.log(data);
            $("#register-verify-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            alert('登録メールアドレスに検証コードを送信しました。');
        })
            .catch(function (err) {
            console.log(err);
            alert(err);
            return;
        });
    });
    $('#register-verify-submit').click(function (e) {
        var code = $("#register-verify-form #code").val();
        if (!code && code == '') {
            alert('検証コードを入力してください');
            return;
        }
        aws_amplify_1.Auth.confirmSignUp(email, code)
            .then(function (data) {
            console.log(data);
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $("#register-verify-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(_this).addClass('active');
            alert('ユーザ登録が完了しました。');
        })
            .catch(function (err) {
            console.log(err);
            alert(err);
            return;
        });
    });
    $('#login-submit').click(function (e) {
        email = $("#login-form #email").val();
        var password = $("#login-form #password").val();
        if (!email && email == '') {
            alert('メールアドレスを入力してください');
            return;
        }
        if (!password && password == '') {
            alert('パスワードを入力してください');
            return;
        }
        aws_amplify_1.Auth.signIn(email, password)
            .then(function (data) {
            console.log(data);
            alert('サインインに成功しました');
            var apiName = 'AmplifyTest';
            var path = '/member';
            aws_amplify_1.API.get(apiName, path)
                .then(function (response) {
                console.log(response);
            })
                .catch(function (err) {
                console.log(err);
            });
        })
            .catch(function (err) {
            console.log(err);
            alert(err);
            return;
        });
    });
    $('#signout').click(function (e) {
        aws_amplify_1.Auth.signOut()
            .then(function (data) {
            console.log(data);
            alert('サインアウトしました');
        })
            .catch(function (err) {
            console.log(err);
            alert(err);
            return;
        });
    });
    var apiName = 'AmplifyTest';
    var guest_path = '/guest';
    var member_path = '/member';
    aws_amplify_1.API.get(apiName, guest_path)
        .then(function (response) {
        console.log(response);
    })
        .catch(function (err) {
        console.log(err);
    });
    aws_amplify_1.API.get(apiName, member_path)
        .then(function (response) {
        console.log(response);
    })
        .catch(function (err) {
        console.log(err);
    });
});
//# sourceMappingURL=main.js.map