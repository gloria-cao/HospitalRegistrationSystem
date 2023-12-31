/* 统一在仓库发home页面请求 */
import { defineStore } from "pinia";
import {getHospitalByHosName, getHospitalLevelAndRegion, getHospitalsList} from "@/service/api/home";
import {THospitalsInfo } from "@/types/home";
import {IHomeState} from "@/store/home/type";
import {MessageNoticeFn} from "@/util/messageNotificationFn";

const useHomeStore = defineStore('home', {
    state: (): IHomeState => ({
        hospitalsList: 0,
        totalHospitals: 0,
        hospitalLevel: [],
        hospitalRegion: [],
        searchHospital: []
    }),
    actions: {
    //    获取医院列表数据
        async getHospitalsListAction(page: number, limit: number,info?: THospitalsInfo) {
            const HospitalsListResult = await getHospitalsList(page, limit, info)
            this.hospitalsList = HospitalsListResult.data.data.content
            this.totalHospitals = HospitalsListResult.data.data.totalElements
            MessageNoticeFn(HospitalsListResult.data.code, HospitalsListResult.data.message)
        },

    //    获取医院等级和地区信息
        async getHospitalLevelAndRegionAction(dictCode: string) {
            if(dictCode === 'Beijin') {
                const hospitalReginResult = await getHospitalLevelAndRegion(dictCode);
                this.hospitalRegion = hospitalReginResult.data.data
                MessageNoticeFn(hospitalReginResult.data.code, hospitalReginResult.data.message)
            }else {
                const LevelAndReginResult = await getHospitalLevelAndRegion(dictCode);
                this.hospitalLevel = LevelAndReginResult.data.data
                MessageNoticeFn(LevelAndReginResult.data.code, LevelAndReginResult.data.message)
            }
        },

    //    根据医院名称获取数据
        async getHospitalByHosNameAction(hosName: string) {
            const FindHospitalResult = await getHospitalByHosName(hosName)
            this.searchHospital = FindHospitalResult.data.data
            MessageNoticeFn(FindHospitalResult.data.code, FindHospitalResult.data.message)
        }
    }
})

export default useHomeStore
