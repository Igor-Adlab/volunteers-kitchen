import { LOCAL_AGE_GROUP_CONFIG, WoldVisionAgeGroup, WORLD_VISION_AGE_GROUP_CONFIG } from "../constants";

export function getLocalAgeGroup(years: number): WoldVisionAgeGroup {
    for(let group in LOCAL_AGE_GROUP_CONFIG) {
        const config: { min: number, max?: number } | null = LOCAL_AGE_GROUP_CONFIG[group];
        if(!config) {
            continue;
        }

        if(years >= config.min && years <= (config.max || Infinity)) {
            return group as WoldVisionAgeGroup;
        }
    }

    return WoldVisionAgeGroup.Unknown;
}

export function getWorldVisionAgeGroup(years: number) {
    for(let group in WORLD_VISION_AGE_GROUP_CONFIG) {
        const config: { min: number, max?: number } | null = WORLD_VISION_AGE_GROUP_CONFIG[group];
        if(!config) {
            continue;
        }

        if(years >= config.min && years <= (config.max || Infinity)) {
            return group as WoldVisionAgeGroup;
        }
    }

    return WoldVisionAgeGroup.Unknown;
}