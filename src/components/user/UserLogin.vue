<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../plugins/axiosinterceptor.js';

const email = ref('');
const password = ref('');
const router = useRouter();

const submitLogin = async () => {
    if (!email.value || !password.value) {
        alert("이메일과 비밀번호를 모두 입력해주세요.");
        return;
    }

    try {
        const response = await api.post('/user/login', {
            email: email.value,
            password: password.value
        });

        console.log("로그인 성공:", response.data);
        alert("로그인에 성공했습니다! 환영합니다.");

        router.push('/board');

    } catch (error) {
        console.error("로그인 실패:", error);
        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center mt-2">
                로그인
            </h2>

            <div class="flex flex-col space-y-5">

                <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">이메일</label>
                    <input id="email" v-model="email" type="email" placeholder="이메일 주소를 입력하세요"
                        @keyup.enter="submitLogin"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm" />
                </div>

                <div>
                    <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">비밀번호</label>
                    <input id="password" v-model="password" type="password" placeholder="비밀번호를 입력하세요"
                        @keyup.enter="submitLogin"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm" />
                </div>

                <div class="pt-4">
                    <button @click="submitLogin"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        로그인
                    </button>
                </div>

                <div class="text-center mt-4">
                    <p class="text-sm text-gray-600">
                        계정이 없으신가요?
                        <a href="#" @click.prevent="$router.push('/user/signup')"
                            class="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                            회원가입하기
                        </a>
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>