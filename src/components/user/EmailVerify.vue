<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../plugins/axiosinterceptor.js';

const route = useRoute();
const router = useRouter();

const statusMessage = ref('이메일 인증을 진행 중입니다...');
const isSuccess = ref(false);

const verifyEmail = async () => {
    const uuid = route.query.uuid;

    if (!uuid) {
        statusMessage.value = '잘못된 접근입니다 (인증 코드가 없습니다).';
        return;
    }

    try {
        await api.get(`/user/verify?uuid=${uuid}`);

        statusMessage.value = '이메일 인증이 완료되었습니다! 🎉';
        isSuccess.value = true;

        setTimeout(() => {
            router.push('/user/login');
        }, 3000);

    } catch (error) {
        console.error("인증 실패:", error);
        statusMessage.value = '인증에 실패했거나 이미 만료된 링크입니다.';
    }
};

onMounted(() => {
    verifyEmail();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-center">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-10 text-center border border-gray-100">

            <div v-if="isSuccess" class="flex justify-center mb-6 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <div v-else class="flex justify-center mb-6 text-blue-500">
                <svg class="animate-spin h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </div>

            <h2 class="text-2xl font-bold text-gray-800 mb-4">
                {{ statusMessage }}
            </h2>

            <p v-if="isSuccess" class="text-gray-500 text-sm">
                잠시 후 로그인 화면으로 이동합니다...
            </p>
            <p v-else-if="!isSuccess && statusMessage.includes('실패')" class="text-gray-500 text-sm mt-4">
                <button @click="$router.push('/user/login')" class="text-blue-600 hover:underline">
                    로그인 화면으로 돌아가기
                </button>
            </p>

        </div>
    </div>
</template>