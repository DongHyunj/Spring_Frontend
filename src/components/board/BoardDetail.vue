<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../plugins/axiosinterceptor.js';

const route = useRoute();
const router = useRouter();

// 주소창 글 번호 가져오기
const postId = route.params.idx;

// 게시글 담을 객체
const board = ref({});

const fetchBoardDetail = async () => {
    try {
        const response = await api.get(`/board/list/${postId}`);
        board.value = response.data;
    } catch (error) {
        console.error("게시글 상세 조회 실패:", error);
        alert("게시글을 불러오는데 실패했습니다.");
        router.push('/board');
    }
};

onMounted(() => {
    fetchBoardDetail();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div class="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative">

            <button @click="$router.push('/board')"
                class="absolute left-6 top-8 text-gray-400 hover:text-gray-800 transition duration-200 focus:outline-none cursor-pointer"
                title="목록으로 가기">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>

            <div class="mb-8 mt-4 border-b border-gray-100 pb-6">
                <h2 class="text-3xl font-bold text-gray-800 text-center mb-3">
                    {{ board.title }}
                </h2>
                <p class="text-center text-gray-400 text-sm font-medium">
                    No. {{ board.idx }}
                </p>
            </div>

            <div class="min-h-[200px] text-gray-700 leading-relaxed whitespace-pre-wrap px-2">
                {{ board.contents }}
            </div>

            <div class="pt-8 mt-8 border-t border-gray-100 flex justify-center">
                <button @click="$router.push('/board')"
                    class="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    목록으로 돌아가기
                </button>
            </div>

        </div>
    </div>
</template>