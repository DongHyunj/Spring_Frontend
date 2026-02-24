<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../plugins/axiosinterceptor.js';

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const name = ref('');

const router = useRouter();

const submitSignup = async () => {
    if (password.value !== passwordConfirm.value) {
        alert("비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
        return;
    }

    try {
        const response = await api.post('/user/signup', {
            email: email.value,
            password: password.value,
            name: name.value
        });

        alert("회원가입이 완료되었습니다! 환영합니다. 🎉");

        router.push('/user/login');

    } catch (error) {
        console.error("회원가입 에러:", error);
        alert("회원가입에 실패했습니다.");
    }
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative">

            <button @click="$router.push('/user/login')"
                class="absolute left-6 top-8 text-gray-400 hover:text-gray-800 transition duration-200 focus:outline-none cursor-pointer"
                title="메인으로 가기">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>

            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center mt-2">
                회원가입
            </h2>

            <div class="flex flex-col space-y-5">

                <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">아이디</label>
                    <input id="email" v-model="email" type="email" placeholder="아이디를 입력하세요"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm" />
                </div>

                <div>
                    <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">비밀번호</label>
                    <input id="password" v-model="password" type="password" placeholder="비밀번호를 입력하세요"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm" />
                </div>

                <div>
                    <label for="passwordConfirm" class="block text-sm font-semibold text-gray-700 mb-2">비밀번호 확인</label>
                    <input id="passwordConfirm" v-model="passwordConfirm" type="password"
                        placeholder="비밀번호를 한 번 더 입력하세요"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm" />
                </div>

                <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">이름 (닉네임)</label>
                    <input id="name" v-model="name" type="text" placeholder="이름을 입력하세요"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm" />
                </div>

                <div class="pt-6">
                    <button @click="submitSignup"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        가입하기
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>