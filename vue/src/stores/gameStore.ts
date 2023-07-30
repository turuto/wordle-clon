import {defineStore} from 'pinia'

export const useGameStore = defineStore('game', {
    state: () => ({
        tries: 0,
        counter: 0,
    }),
    actions: {},
});