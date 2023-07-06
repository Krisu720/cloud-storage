export interface PricingCardType {
    title: string;
    desc: string;
    recommended: boolean;
    price: string;
    benefits: {
      status: boolean;
      name: string;
    }[];
  }
  
  class Card implements PricingCardType {
    title: string;
    desc: string;
    recommended: boolean;
    price: string;
    benefits: { status: boolean; name: string }[];
  
    constructor({ title, desc, recommended, price, benefits }: PricingCardType) {
      this.title = title;
      this.desc = desc;
      this.recommended = recommended;
      (this.price = price), (this.benefits = benefits);
    }
  }
  
 export const pricingCards = [
    new Card({
      title: "500MB storage",
      desc: "For users ho dont use cloudstorage that much.",
      recommended: false,
      price: "0 PLN",
      benefits: [
        {
          status: true,
          name: "500MB of storage",
        },
        {
          status: false,
          name: "Mobile app access",
        },
        {
          status: false,
          name: "Dedicated support",
        },
      ],
    }),
    new Card({
      title: "2GB storage",
      desc: "For users who are developing small project.",
      recommended: true,
      price: "10 PLN",
      benefits: [
        {
          status: true,
          name: "500MB of storage",
        },
        {
          status: false,
          name: "Mobile app access",
        },
        {
          status: false,
          name: "Dedicated support",
        },
      ],
    }),
    new Card({
      title: "Unlimited storage",
      desc: "For advanced projects that require high storage capacity.",
      recommended: false,
      price: "Custom",
      benefits: [
        {
          status: true,
          name: "500MB of storage",
        },
        {
          status: true,
          name: "Mobile app access",
        },
        {
          status: true,
          name: "Dedicated support",
        },
      ],
    }),
  ];