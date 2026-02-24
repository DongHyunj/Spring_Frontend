<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../plugins/axiosinterceptor.js';

const route = useRoute();
const router = useRouter();

const postId = route.params.idx;
const title = ref('');
const contents = ref('');

const fetchPost = async () => {
    try {
        const response = await api.get(`/boards/list/${postId}`);
        title.value = response.data.title;
        contents.value = response.data.contents;
    } catch (error) {
        console.error("게시글 불러오기 실패:", error);
        alert("데이터를 불러오지 못했습니다.");
        router.push('/');
    }
};

const updatePost = async () => {
    try {
        const response = await api.patch(`/boards/edit/${postId}`, {
            title: title.value,
            contents: contents.value
        });

        alert(response.data);
        router.push(`/boards/list/${postId}`);

    } catch (error) {
        console.error("수정 실패:", error);
    }
};

onMounted(() => {
    fetchPost();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div class="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative">

            <button @click="$router.go(-1)"
                class="absolute left-6 top-8 text-gray-400 hover:text-gray-800 transition duration-200 focus:outline-none cursor-pointer"
                title="뒤로 가기">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>

            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
                게시글 수정
            </h2>

            <div class="flex flex-col space-y-6">
                <div>
                    <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">제목</label>
                    <input id="title" v-model="title" type="text"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm" />
                </div>

                <div>
                    <label for="contents" class="block text-sm font-semibold text-gray-700 mb-2">내용</label>
                    <textarea id="contents" v-model="contents" rows="8"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm resize-y"></textarea>
                </div>

                <div class="pt-4">
                    <button @click="updatePost"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        수정 완료
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>