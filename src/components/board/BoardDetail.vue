<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../plugins/axiosinterceptor.js';

const route = useRoute();
const router = useRouter();

const postId = route.params.idx;

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

const deletePost = async () => {
    if (confirm("정말 이 게시글을 삭제하시겠습니까?")) {
        try {
            await api.delete(`/board/list/${postId}/delete`);
            alert("게시글이 삭제되었습니다.");

            router.push("/board");
        } catch (error) {
            console.log("삭제 실패:", error);
            alert("삭제에 실패했습니다.");
        }
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

            <div class="pt-8 mt-8 border-t border-gray-100 flex justify-center space-x-4">
                <button @click="$router.push(`/board/list/${postId}/update`)"
                    class="w-1/2 sm:w-1/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    수정하기
                </button>
                <button @click="deletePost"
                    class="w-1/3 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    삭제하기
                </button>
            </div>

        </div>
    </div>
</template>