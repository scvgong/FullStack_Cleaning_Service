import { create } from "zustand";

const useQuoteFormStore = create((set) => ({
  form: {
    serviceType: "",
    spaceType: "",
    area: "",
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
    agree: false,
  },
  images: [],
  errors: {},
  showPreview: false,
  submitSuccess: false,

  setForm: (updated) =>
    set((state) => ({ form: { ...state.form, ...updated } })),

  setImages: (images) => set({ images }),
  setErrors: (errors) => set({ errors }),
  setShowPreview: (value) => set({ showPreview: value }),
  setSubmitSuccess: (value) => set({ submitSuccess: value }),
  resetForm: () =>
    set({
      form: {
        serviceType: "",
        spaceType: "",
        area: "",
        name: "",
        phone: "",
        email: "",
        location: "",
        message: "",
        agree: false,
      },
      images: [],
      errors: {},
    }),
}));

export default useQuoteFormStore;
