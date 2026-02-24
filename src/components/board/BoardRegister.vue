<script setup>
import { ref } from 'vue';
import api from '../../plugins/axiosinterceptor.js';

const title = ref('');
const contents = ref('');

const submitPost = async () => {
    try {
        const response = await api.post('/board/reg', {
            title: title.value,
            contents: contents.value
        });

        alert(response.data);
    } catch (error) {
        console.error("에러 발생:", error);
    }
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div class="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">

            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
                게시글 작성
            </h2>

            <div class="flex flex-col space-y-6">

                <div>
                    <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">제목</label>
                    <input id="title" v-model="title" type="text" placeholder="제목을 입력하세요"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm" />
                </div>

                <div>
                    <label for="contents" class="block text-sm font-semibold text-gray-700 mb-2">내용</label>
                    <textarea id="contents" v-model="contents" placeholder="내용을 자유롭게 입력하세요" rows="8"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm resize-y"></textarea>
                </div>

                <div class="pt-4">
                    <button @click="submitPost"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        등록하기
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>