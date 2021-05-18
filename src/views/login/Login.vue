<template>
    <div class="login_container">
        <div class="login_box">
            <div class="login_avator">
                <img src="../../assets/logo.png" alt="">
            </div>
            <div class="login_form">
                <el-form status-icon :rules="loginRules"  ref="loginForm" label-width="0px"
                         class="form_content" :model="loginForm">
                    <el-form-item prop="username">
                        <el-input type="text" v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                        <el-button type="info" @click="resetForm('loginForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from "../../api/user/login"

    export default {
        name: "Login",
        data(){
            return {
                // 表单数据绑定
                loginForm: {
                    username: 'admin',
                    password:  '123456'
                },
                // 表单规则验证对象
                loginRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            //表单登录预验证
            submitForm(formName) {
                //接收valid，bool
                this.$refs[formName].validate(async valid => {
                    if (!valid) {
                        console.log('error submit!!');
                        return false;
                    }
                    let {data:res} =await login(this.loginForm)
                    console.log(res)
                    if (res.meta.status == 200) {
                        this.$message({
                            message: '登录成功咯',
                            type: 'success'
                        });
                        //将登录成功之后的token保存到客户端的sessionStorage中
                        window.sessionStorage.setItem("token",res.data.token)
                        this.$router.push("/home")
                    } else {
                        this.$message.error('用户名或密码错误哦');
                    }
                })
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .login_container {
        background: skyblue;
        height: 100%;
    }
    .login_box {
        position: absolute;
        width: 470px;
        height: 320px;
        background: #ffffff;
        border-radius: 8px ;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .login_avator {
        position: absolute;
        width: 100px;
        height: 100px;
        overflow: hidden;
        background: #eee;
        border-radius: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        box-shadow: 0 0 5px rgba(0,0,0,.3);
    }
    .login_avator img {
        width: 100%;
        height: 100%;
    }
    .login_form {
        position: absolute;
        width: 100%;
        padding: 0 50px;
        bottom:5px;
        box-sizing: border-box;
        /*transform: translate(0,-50%);*/
    }
    .form_content {
        margin: 0 auto;
    }
    .btn {
        display: flex;
        justify-content: flex-end;
    }

</style>