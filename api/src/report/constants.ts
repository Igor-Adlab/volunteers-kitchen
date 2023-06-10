export enum WoldVisionAgeGroup {
    Unknown = 'Unknown',

    Adults = 'Adults',
    Infants = 'Infants',
    Children = 'Children',
    Teenagers = 'Teenagers',
    OlderAdults = 'OlderAdults',
}

export const LOCAL_AGE_GROUP_CONFIG = {
    [WoldVisionAgeGroup.Children]: {
        min: 0,
        max: 17,
    },
    [WoldVisionAgeGroup.Adults]: {
        min: 18,
        max: 59,
    },
    [WoldVisionAgeGroup.OlderAdults]: {
        min: 60,
    },
};

export const WORLD_VISION_AGE_GROUP_CONFIG = {
    [WoldVisionAgeGroup.Infants]: {
        min: 0,
        max: 5,
    },
    [WoldVisionAgeGroup.Children]: {
        min: 5,
        max: 11,
    },
    [WoldVisionAgeGroup.Teenagers]: {
        min: 12,
        max: 17,
    },
    [WoldVisionAgeGroup.Adults]: {
        min: 18,
        max: 59,
    },
    [WoldVisionAgeGroup.OlderAdults]: {
        min: 60,
    },
}
