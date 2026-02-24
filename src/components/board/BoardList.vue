<script setup>
import { ref, onMounted } from 'vue';
import api from '../../plugins/axiosinterceptor.js';
import { useRouter } from 'vue-router';

const boardList = ref([]);
const router = useRouter();

const fetchBoardList = async () => {
    try {
        const response = await api.get('/boards/list');
        boardList.value = response.data;
    } catch (error) {
        console.error("게시글 목록 조회 실패:", error);
    }
};

const goToDetail = (idx) => {
    router.push(`/boards/list/${idx}`);
}

onMounted(() => {
    fetchBoardList();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div class="max-w-5xl w-full">

            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    게시글 목록
                </h2>

                <button @click="$router.push('/boards/reg')"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg transition duration-200 shadow-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    글쓰기
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <table class="min-w-full text-left text-sm text-gray-600">
                    <thead class="bg-gray-100 border-b border-gray-200 text-gray-700 uppercase text-xs font-semibold">
                        <tr>
                            <th scope="col" class="px-6 py-4 w-24 text-center">번호</th>
                            <th scope="col" class="px-6 py-4">제목</th>
                            <th scope="col" class="px-6 py-4 w-1/3">내용</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-if="boardList.length === 0">
                            <td colspan="3" class="px-6 py-12 text-center text-gray-500 font-medium">
                                등록된 게시글이 없습니다. 첫 글을 작성해 보세요!
                            </td>
                        </tr>
                        <tr v-for="board in boardList" :key="board.idx" @click="goToDetail(board.idx)"
                            class="hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                            <td class="px-6 py-4 font-medium text-gray-900 text-center">{{ board.idx }}</td>
                            <td class="px-6 py-4 font-bold text-gray-800">{{ board.title }}</td>
                            <td class="px-6 py-4 text-gray-500 truncate max-w-xs">{{ board.contents }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>