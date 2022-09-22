import { createSlice } from "@reduxjs/toolkit";

interface State {
  device: string | null;
  sku: string | null;
  manufacturer: string | null;
  model: string | null;
  storage: string | null;
  color: string | null;
  carrier: string | null;
  estimateValue: string | null;
  code: string | null;
  openPopup: boolean;
  image: string | null;
  shippingInfo: boolean;
  showSpinner: boolean;
  createdInput: {
    partnerId: string | null;
    customer: {
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      phone: string | null;
      mobile: string | null;
      addresses: [
        {
          address1: string | null;
          city: string | null;
          stateOrProvince: string | null;
          zip: string | null;
          country: string | null;
        }
      ];
    };
    currency: string | null;
    country: string | null;
    lineItems: [
      {
        productId: string | null;
        sku: string | null;
        partnerGradeId: string | null;
        partnerGrade: string | null;
        value: string | null;
        priceEffectivityDate: string | null;
      }
    ];
    paymentMethod: string | null;
  };
  ids: {
    deviceId: string | null;
    manufacturerId: string | null;
    modelId: string | null;
    storageId: string | null;
    carrierId: string | null;
    colorId: string | null;
    countries: {
      code: string | null;
      currency: string | null;
    };
  };
  deviceCondition: {
    question1: boolean | undefined | null;
    question2: boolean | undefined | null;
    question3: boolean | undefined | null;
    question4: boolean | undefined | null;
    question5: boolean | undefined | null;
    question6: boolean | undefined | null;
    question7: boolean | undefined | null;
    grade: {
      question1: string | null;
      question2: string | null;
      question3: string | null;
      question4: string | null;
      question5: string | null;
      question6: string | null;
      question7: string | null;
    };
  };
  deviceDiagnostic: {
    partnerGrade1: string | null;
    deviceConditionId1: number | null;
    deviceConditionGradeId1: number | null;
    partnerGrade2: string | null;
    deviceConditionId2: number | null;
    deviceConditionGradeId2: number | null;
    partnerGrade3: string | null;
    deviceConditionId3: number | null;
    deviceConditionGradeId3: number | null;
    partnerGrade4: string | null;
    deviceConditionId4: number | null;
    deviceConditionGradeId4: number | null;
    partnerGrade5: string | null;
    deviceConditionId5: number | null;
    deviceConditionGradeId5: number | null;
    partnerGrade6: string | null;
    deviceConditionId6: number | null;
    deviceConditionGradeId6: number | null;
    partnerGrade7: string | null;
    deviceConditionId7: number | null;
    deviceConditionGradeId7: number | null;
  };
}
const initialState: State = {
  device: null,
  sku: null,
  manufacturer: null,
  model: null,
  storage: null,
  color: null,
  carrier: null,
  estimateValue: null,
  code: null,
  openPopup: false,
  image: null,
  shippingInfo: false,
  showSpinner: false,
  ids: {
    deviceId: null,
    manufacturerId: null,
    modelId: null,
    storageId: null,
    carrierId: null,
    colorId: null,
    countries: {
      code: null,
      currency: null,
    },
  },
  createdInput: {
    partnerId: null,
    customer: {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      mobile: null,
      addresses: [
        {
          address1: null,
          city: null,
          stateOrProvince: null,
          zip: null,
          country: null,
        },
      ],
    },
    currency: null,
    country: null,
    lineItems: [
      {
        productId: null,
        sku: null,
        partnerGradeId: null,
        partnerGrade: null,
        value: null,
        priceEffectivityDate: null,
      },
    ],
    paymentMethod: null,
  },
  deviceCondition: {
    question1: undefined,
    question2: undefined,
    question3: undefined,
    question4: undefined,
    question5: undefined,
    question6: undefined,
    question7: undefined,
    grade: {
      question1: null,
      question2: null,
      question3: null,
      question4: null,
      question5: null,
      question6: null,
      question7: null,
    },
  },
  deviceDiagnostic: {
    partnerGrade1: null,
    deviceConditionId1: null,
    deviceConditionGradeId1: null,
    partnerGrade2: null,
    deviceConditionId2: null,
    deviceConditionGradeId2: null,
    partnerGrade3: null,
    deviceConditionId3: null,
    deviceConditionGradeId3: null,
    partnerGrade4: null,
    deviceConditionId4: null,
    deviceConditionGradeId4: null,
    partnerGrade5: null,
    deviceConditionId5: null,
    deviceConditionGradeId5: null,
    partnerGrade6: null,
    deviceConditionId6: null,
    deviceConditionGradeId6: null,
    partnerGrade7: null,
    deviceConditionId7: null,
    deviceConditionGradeId7: null,
  },
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    chooseDevice: (state, action) => {
      return {
        ...state,
        device: action.payload.name,
        ids: {
          ...state.ids,
          deviceId: action.payload.id,
        },
      };
    },
    setCountries: (state, action) => {
      return {
        ...state,
        ids: {
          ...state.ids,
          countries: {
            ...state.ids.countries,
            code: action.payload.code,
            currency: action.payload.currency,
          },
        },
      };
    },
    setSKU: (state, action) => {
      return {
        ...state,
        sku: action.payload.sku,
      };
    },
    selectManufacturer: (state, action) => {
      return {
        ...state,
        manufacturer: action.payload.name,
        ids: {
          ...state.ids,
          manufacturerId: action.payload.id,
        },
      };
    },
    selectModel: (state, action) => {
      return {
        ...state,
        model: action.payload.name,
        image: action.payload.image,
        ids: {
          ...state.ids,
          modelId: action.payload.id,
        },
      };
    },
    selectStorage: (state, action) => {
      return {
        ...state,
        storage: action.payload.name,
        ids: {
          ...state.ids,
          storageId: action.payload.id,
        },
      };
    },
    selectCarrier: (state, action) => {
      return {
        ...state,
        carrier: action.payload.name,
        ids: {
          ...state.ids,
          carrierId: action.payload.id,
        },
      };
    },
    selectColor: (state, action) => {
      return {
        ...state,
        color: action.payload.name,
        ids: {
          ...state.ids,
          colorId: action.payload.id,
        },
      };
    },
    addEstimateValue: (state, action) => {
      return {
        ...state,
        createdInput: {
          ...state.createdInput,
          lineItems: [
            {
              productId: action.payload.productId,
              sku: action.payload.sku,
              partnerGradeId: action.payload.partnerGradeId,
              partnerGrade: action.payload.partnerGrade,
              value: action.payload.value,
              priceEffectivityDate: action.payload.priceEffectivityDate,
            },
          ],
        },
        estimateValue: action.payload.estimateValue,
        code: action.payload.code,
      };
    },
    resetEstimateValue: (state, action) => {
      return {
        ...state,
        estimateValue: action.payload.estimate,
      };
    },
    openPopup: (state, action) => {
      return {
        ...state,
        openPopup: action.payload,
      };
    },
    updateShippingInfo: (state, action) => {
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },
    setCreatedInput: (state, action) => {
      return {
        ...state,
        createdInput: {
          ...state.createdInput,
          partnerId: action.payload.partnerId,
          customer: {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            phone: action.payload.phone,
            mobile: action.payload.phone,
            addresses: [
              {
                address1: action.payload.street1,
                city: action.payload.city,
                stateOrProvince: action.payload.state,
                zip: action.payload.zip,
                country: action.payload.country,
              },
            ],
          },
          currency: action.payload.currency,
          country: action.payload.countryCode,
          paymentMethod: "GIFT_CARD",
        },
      };
    },
    showSpinner: (state, action) => {
      return {
        ...state,
        showSpinner: action.payload,
      };
    },
    confirmTrade: (state, action) => {
      return {
        ...state,
        createdInput: {
          ...state.createdInput,
          ...action.payload,
        },
      };
    },
    resetInput: (state) => {
      return {
        ...initialState,
      };
    },
    setQuestion1: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          question1: action.payload,
        },
      };
    },
    setQuestion2: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          question2: action.payload,
        },
      };
    },
    setQuestion3: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          question3: action.payload,
        },
      };
    },
    setQuestion4: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          question4: action.payload,
        },
      };
    },
    setQuestion5: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          question5: action.payload,
        },
      };
    },
    setQuestion6: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          question6: action.payload,
        },
      };
    },
    setQuestion7: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          question7: action.payload,
        },
      };
    },
    setGrade1: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          grade: {
            ...state.deviceCondition.grade,
            question1: action.payload.name,
          },
        },
        deviceDiagnostic: {
          ...state.deviceDiagnostic,
          partnerGrade1: action.payload.partnerGradeId,
          deviceConditionId1: action.payload.deviceConditionId,
          deviceConditionGradeId1: action.payload.deviceConditionGradeId,
        },
      };
    },
    setGrade2: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          grade: {
            ...state.deviceCondition.grade,
            question2: action.payload.name,
          },
        },
        deviceDiagnostic: {
          ...state.deviceDiagnostic,
          partnerGrade2: action.payload.partnerGradeId,
          deviceConditionId2: action.payload.deviceConditionId,
          deviceConditionGradeId2: action.payload.deviceConditionGradeId,
        },
      };
    },
    setGrade3: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          grade: {
            ...state.deviceCondition.grade,
            question3: action.payload.name,
          },
        },
        deviceDiagnostic: {
          ...state.deviceDiagnostic,
          partnerGrade3: action.payload.partnerGradeId,
          deviceConditionId3: action.payload.deviceConditionId,
          deviceConditionGradeId3: action.payload.deviceConditionGradeId,
        },
      };
    },
    setGrade4: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          grade: {
            ...state.deviceCondition.grade,
            question4: action.payload.name,
          },
        },
        deviceDiagnostic: {
          ...state.deviceDiagnostic,
          partnerGrade4: action.payload.partnerGradeId,
          deviceConditionId4: action.payload.deviceConditionId,
          deviceConditionGradeId4: action.payload.deviceConditionGradeId,
        },
      };
    },
    setGrade5: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          grade: {
            ...state.deviceCondition.grade,
            question5: action.payload.name,
          },
        },
        deviceDiagnostic: {
          ...state.deviceDiagnostic,
          partnerGrade5: action.payload.partnerGradeId,
          deviceConditionId5: action.payload.deviceConditionId,
          deviceConditionGradeId5: action.payload.deviceConditionGradeId,
        },
      };
    },
    setGrade6: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          grade: {
            ...state.deviceCondition.grade,
            question6: action.payload.name,
          },
        },
        deviceDiagnostic: {
          ...state.deviceDiagnostic,
          partnerGrade6: action.payload.partnerGradeId,
          deviceConditionId6: action.payload.deviceConditionId,
          deviceConditionGradeId6: action.payload.deviceConditionGradeId,
        },
      };
    },
    setGrade7: (state, action) => {
      return {
        ...state,
        deviceCondition: {
          ...state.deviceCondition,
          grade: {
            ...state.deviceCondition.grade,
            question7: action.payload.name,
          },
        },
        deviceDiagnostic: {
          ...state.deviceDiagnostic,
          partnerGrade7: action.payload.partnerGradeId,
          deviceConditionId7: action.payload.deviceConditionId,
          deviceConditionGradeId7: action.payload.deviceConditionGradeId,
        },
      };
    },
    resetDeviceCondition: (state) => {
      return {
        ...state,
        estimateValue: null,
        deviceCondition: {
          question1: undefined,
          question2: undefined,
          question3: undefined,
          question4: undefined,
          question5: undefined,
          question6: undefined,
          question7: undefined,
          grade: {
            question1: null,
            question2: null,
            question3: null,
            question4: null,
            question5: null,
            question6: null,
            question7: null,
          },
        },
      };
    },
    resetQuotationDetails: (state) => {
      return {
        ...state,
        model: null,
        storage: null,
        carrier: null,
        estimateValue: null,
        deviceCondition: {
          question1: undefined,
          question2: undefined,
          question3: undefined,
          question4: undefined,
          question5: undefined,
          question6: undefined,
          question7: undefined,
          grade: {
            question1: null,
            question2: null,
            question3: null,
            question4: null,
            question5: null,
            question6: null,
            question7: null,
          },
        },
        deviceDiagnostic: {
          partnerGrade1: null,
          deviceConditionId1: null,
          deviceConditionGradeId1: null,
          partnerGrade2: null,
          deviceConditionId2: null,
          deviceConditionGradeId2: null,
          partnerGrade3: null,
          deviceConditionId3: null,
          deviceConditionGradeId3: null,
          partnerGrade4: null,
          deviceConditionId4: null,
          deviceConditionGradeId4: null,
          partnerGrade5: null,
          deviceConditionId5: null,
          deviceConditionGradeId5: null,
          partnerGrade6: null,
          deviceConditionId6: null,
          deviceConditionGradeId6: null,
          partnerGrade7: null,
          deviceConditionId7: null,
          deviceConditionGradeId7: null,
        },
      };
    },
    resetQuotationDetailsExceptModel: (state) => {
      return {
        ...state,
        storage: null,
        carrier: null,
        estimateValue: null,
        deviceCondition: {
          question1: undefined,
          question2: undefined,
          question3: undefined,
          question4: undefined,
          question5: undefined,
          question6: undefined,
          question7: undefined,
          grade: {
            question1: null,
            question2: null,
            question3: null,
            question4: null,
            question5: null,
            question6: null,
            question7: null,
          },
        },
        deviceDiagnostic: {
          partnerGrade1: null,
          deviceConditionId1: null,
          deviceConditionGradeId1: null,
          partnerGrade2: null,
          deviceConditionId2: null,
          deviceConditionGradeId2: null,
          partnerGrade3: null,
          deviceConditionId3: null,
          deviceConditionGradeId3: null,
          partnerGrade4: null,
          deviceConditionId4: null,
          deviceConditionGradeId4: null,
          partnerGrade5: null,
          deviceConditionId5: null,
          deviceConditionGradeId5: null,
          partnerGrade6: null,
          deviceConditionId6: null,
          deviceConditionGradeId6: null,
          partnerGrade7: null,
          deviceConditionId7: null,
          deviceConditionGradeId7: null,
        },
      };
    },
  },
});

export const {
  chooseDevice,
  setCountries,
  setSKU,
  selectManufacturer,
  selectModel,
  selectStorage,
  selectCarrier,
  selectColor,
  openPopup,
  addEstimateValue,
  resetEstimateValue,
  updateShippingInfo,
  setCreatedInput,
  showSpinner,
  confirmTrade,
  resetInput,
  setQuestion1,
  setQuestion2,
  setQuestion3,
  setQuestion4,
  setQuestion5,
  setQuestion6,
  setQuestion7,
  setGrade1,
  setGrade2,
  setGrade3,
  setGrade4,
  setGrade5,
  setGrade6,
  setGrade7,
  resetDeviceCondition,
  resetQuotationDetails,
  resetQuotationDetailsExceptModel,
} = itemSlice.actions;

export default itemSlice.reducer;
