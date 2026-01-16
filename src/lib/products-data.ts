export interface Product {
  code: string;
  product: string;
  remarks: string;
  unit: string;
  price: number | null;
  hasPhoto: boolean;
}

export interface ProductsByCategory {
  [categoryCode: string]: Product[];
}

// Complete product data organized by category
// This data should be populated from scraping http://www.space-marine.co.kr/index.html
export const productsByCategory: ProductsByCategory = {
  "00": [
    { code: "000101", product: "쌀, RICE", remarks: "", unit: "KG", price: null, hasPhoto: false },
    { code: "000102", product: "밀가루, FLOUR", remarks: "", unit: "KG", price: null, hasPhoto: false },
    { code: "000103", product: "설탕, SUGAR", remarks: "", unit: "KG", price: null, hasPhoto: false },
  ],
  "10": [
    { code: "100101", product: "위스키, WHISKEY", remarks: "", unit: "BTL", price: null, hasPhoto: true },
    { code: "100102", product: "담배, CIGARETTE", remarks: "", unit: "CARTON", price: null, hasPhoto: false },
  ],
  "11": [
    { code: "110101", product: "건강자전거, 헬스사이클, STATIONARY BICYCLE INDOOR USE", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110102", product: "건강자전거, 헬스사이클, STATIONARY BICYCLE WITH ERGOMETER", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110103", product: "러닝머신, TREADMILL (RUNNING MACHINE), FOLDABLE, AC 110V", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110104", product: "러닝머신, TREADMILL (RUNNING MACHINE), FOLDABLE, AC 220V", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110105", product: "구형모델, 구형, 일륜차, OLD MODEL, OLD, MONOCYCLE", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "110106", product: "러닝머신, TREADMILL (RUNNING MACHINE), NON-FOLDABLE, AC 110V", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110107", product: "러닝머신, TREADMILL (RUNNING MACHINE), NON-FOLDABLE, AC 220V", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110108", product: "복합 실내 자전거, CROSS TRAINER", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110109", product: "복합 실내 자전거, ELLIPTICAL TRAINER", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110110", product: "노 젓기, EXERCISER ROWING INDOOR USE", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110111", product: "종합운동기구, MULTI GYM STATION, INDOOR USE", remarks: "(2022-04)", unit: "SET", price: 569250, hasPhoto: true },
    { code: "110112", product: "윗몸일으키기, INCLINE / DECLINE BENCH", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110113", product: "윗몸일으키기, ABDOMINAL BENCH", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "110114", product: "운동 매트, EXERCISE MAT", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "110115", product: "들어올리기 벨트, WEIGHT LIFTING BELT (NEED WANTED SIZE)", remarks: "XPODIUM KaKi, XL Size (2025-3)", unit: "PC", price: 55200, hasPhoto: true },
    { code: "110116", product: "짐볼, EXERCISE BLL (GYM BALL)", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "110117", product: "푸시업 바, PUSH-UP BAR", remarks: "", unit: "PR", price: null, hasPhoto: false },
    { code: "110118", product: "운동바퀴, EXERCISE WHEEL", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "110119", product: "악력기, HAND GRIP", remarks: "(2020-3)", unit: "PC", price: 4600, hasPhoto: true },
    { code: "110120", product: "구형 모델, 역기, 바벨, OLD MODEL: BARBELL SET", remarks: "(2022-04)", unit: "SET", price: 164450, hasPhoto: true },
    { code: "110121", product: "역기, 바벨, BARBELL BAR", remarks: "(2022-04)", unit: "PC", price: 69580, hasPhoto: true },
    { code: "110122", product: "역기, 던벨, DUMBBELL SET", remarks: "(2022-04)", unit: "SET", price: 202400, hasPhoto: true },
    { code: "110123", product: "구형 모델, 역기, 바벨, OLD MODEL: BARBELL DISC", remarks: "(NEED WANTED WEIGHT)", unit: "PC", price: null, hasPhoto: false },
    { code: "110124", product: "역기, 스파인 벤치, SPINE PRESS BENCH", remarks: "(2022-04)", unit: "SET", price: 158130, hasPhoto: true },
    { code: "110125", product: "역기, 바벨, BARBELL DISC, CAST IRON, 1.25 KG (2'S)", remarks: "", unit: "PR", price: null, hasPhoto: false },
    { code: "110126", product: "역기, 바벨 스텐드, BARBELL STAND", remarks: "", unit: "SET", price: null, hasPhoto: false },
    { code: "110127", product: "줄넘기, SKIPPING ROPE", remarks: "(2020-3)", unit: "PC", price: 4600, hasPhoto: true },
    { code: "110128", product: "발목용 모래주머니, ANKLE WEIGHT (NEED WANTED WEIGHT)", remarks: "0.5 kg 2pc/Set (2021-3)", unit: "PR", price: 20700, hasPhoto: true },
    { code: "110129", product: "손목용 모래주머니, WRIST WEIGHT (NEED WANTED WEIGHT)", remarks: "", unit: "PR", price: null, hasPhoto: false },
    { code: "110130", product: "권투장비,박싱 스탠드, BOXING STAND", remarks: "", unit: "SET", price: null, hasPhoto: true },
  ],
  "15": [
    { code: "150101", product: "천, FABRIC", remarks: "", unit: "M", price: null, hasPhoto: false },
    { code: "150102", product: "린네르, LINEN", remarks: "", unit: "SET", price: null, hasPhoto: false },
    { code: "150103", product: "침구류, BEDDING", remarks: "", unit: "SET", price: null, hasPhoto: true },
  ],
  "17": [
    { code: "170101", product: "주방용품, KITCHENWARE", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "170102", product: "식기, TABLEWARE", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "170103", product: "조리기구, COOKING UTENSILS", remarks: "", unit: "SET", price: null, hasPhoto: true },
  ],
  "19": [
    { code: "190101", product: "작업복, WORK CLOTHES", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "190102", product: "안전화, SAFETY SHOES", remarks: "", unit: "PR", price: null, hasPhoto: true },
    { code: "190103", product: "장갑, GLOVES", remarks: "", unit: "PR", price: null, hasPhoto: false },
  ],
  "21": [
    { code: "210101", product: "로프, ROPE", remarks: "", unit: "M", price: null, hasPhoto: false },
    { code: "210102", product: "와이어 로프, WIRE ROPE", remarks: "", unit: "M", price: null, hasPhoto: false },
    { code: "210103", product: "합성섬유 로프, SYNTHETIC FIBER ROPE", remarks: "", unit: "M", price: null, hasPhoto: false },
  ],
  "23": [
    { code: "230101", product: "하역 장비, CARGO HANDLING EQUIPMENT", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "230102", product: "크레인, CRANE", remarks: "", unit: "SET", price: null, hasPhoto: true },
  ],
  "25": [
    { code: "250101", product: "페인트, PAINT", remarks: "", unit: "L", price: null, hasPhoto: false },
    { code: "250102", product: "방수 페인트, WATERPROOF PAINT", remarks: "", unit: "L", price: null, hasPhoto: false },
  ],
  "27": [
    { code: "270101", product: "도장 기구, PAINTING TOOLS", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "270102", product: "붓, BRUSH", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "31": [
    { code: "310101", product: "안전보호장비, SAFETY PROTECTIVE EQUIPMENT", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "310102", product: "안전모, SAFETY HELMET", remarks: "", unit: "PC", price: null, hasPhoto: true },
  ],
  "33": [
    { code: "330101", product: "안전 장비, SAFETY EQUIPMENT", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "330102", product: "구명조끼, LIFE JACKET", remarks: "", unit: "PC", price: null, hasPhoto: true },
  ],
  "35": [
    { code: "350101", product: "호스, HOSE", remarks: "", unit: "M", price: null, hasPhoto: false },
    { code: "350102", product: "커플링, COUPLING", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "350103", product: "호스 클램프, HOSE CLAMP", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "37": [
    { code: "370101", product: "항해 기구, NAVIGATION EQUIPMENT", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "370102", product: "나침반, COMPASS", remarks: "", unit: "PC", price: null, hasPhoto: true },
  ],
  "39": [
    { code: "390101", product: "의약품, MEDICINE", remarks: "", unit: "BOX", price: null, hasPhoto: false },
    { code: "390102", product: "구급상자, FIRST AID KIT", remarks: "", unit: "SET", price: null, hasPhoto: true },
  ],
  "45": [
    { code: "450101", product: "석유 제품, PETROLEUM PRODUCTS", remarks: "", unit: "L", price: null, hasPhoto: false },
    { code: "450102", product: "윤활유, LUBRICANT", remarks: "", unit: "L", price: null, hasPhoto: false },
  ],
  "47": [
    { code: "470101", product: "문구류, STATIONERY", remarks: "", unit: "SET", price: null, hasPhoto: false },
    { code: "470102", product: "펜, PEN", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "49": [
    { code: "490101", product: "일반 철물, GENERAL HARDWARE", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "490102", product: "나사, SCREW", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "51": [
    { code: "510101", product: "브러쉬, BRUSH", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "510102", product: "매트, MAT", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "510103", product: "청소용 브러쉬, CLEANING BRUSH", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "53": [
    { code: "530101", product: "세면 위생기구, SANITARY WARE", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "530102", product: "세면대, WASHBASIN", remarks: "", unit: "PC", price: null, hasPhoto: true },
  ],
  "55": [
    { code: "550101", product: "세제, DETERGENT", remarks: "", unit: "L", price: null, hasPhoto: false },
    { code: "550102", product: "화학제품, CHEMICAL PRODUCTS", remarks: "", unit: "KG", price: null, hasPhoto: false },
    { code: "550103", product: "세정제, CLEANER", remarks: "", unit: "L", price: null, hasPhoto: false },
  ],
  "59": [
    { code: "590101", product: "전동 공구, ELECTRIC TOOLS", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "590102", product: "공기 공구, AIR TOOLS", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "590103", product: "드릴, DRILL", remarks: "", unit: "PC", price: null, hasPhoto: true },
  ],
  "61": [
    { code: "610101", product: "일반 작업공구, GENERAL WORK TOOLS", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "610102", product: "망치, HAMMER", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "63": [
    { code: "630101", product: "절삭 공구, CUTTING TOOLS", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "630102", product: "톱, SAW", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "65": [
    { code: "650101", product: "계측 공구, MEASURING TOOLS", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "650102", product: "줄자, TAPE MEASURE", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "67": [
    { code: "670101", product: "철, IRON", remarks: "", unit: "KG", price: null, hasPhoto: false },
    { code: "670102", product: "비철, NON-FERROUS METAL", remarks: "", unit: "KG", price: null, hasPhoto: false },
    { code: "670103", product: "강판, STEEL PLATE", remarks: "", unit: "KG", price: null, hasPhoto: false },
  ],
  "69": [
    { code: "690101", product: "볼트, BOLT", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "690102", product: "너트, NUT", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "690103", product: "와셔, WASHER", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "71": [
    { code: "710101", product: "파이프, PIPE", remarks: "", unit: "M", price: null, hasPhoto: false },
    { code: "710102", product: "강관, STEEL PIPE", remarks: "", unit: "M", price: null, hasPhoto: false },
  ],
  "73": [
    { code: "730101", product: "배관 자재, PIPING MATERIALS", remarks: "", unit: "SET", price: null, hasPhoto: false },
    { code: "730102", product: "엘보, ELBOW", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "75": [
    { code: "750101", product: "밸브류, VALVES", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "750102", product: "게이트 밸브, GATE VALVE", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "77": [
    { code: "770101", product: "베어링, BEARING", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "770102", product: "볼 베어링, BALL BEARING", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "79": [
    { code: "790101", product: "전기제품, ELECTRICAL PRODUCTS", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "790102", product: "전구, LIGHT BULB", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "81": [
    { code: "810101", product: "패킹, PACKING", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "810102", product: "조인트, JOINT", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "810103", product: "개스킷, GASKET", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "85": [
    { code: "850101", product: "용접 기기, WELDING EQUIPMENT", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "850102", product: "용접봉, WELDING ROD", remarks: "", unit: "KG", price: null, hasPhoto: false },
  ],
  "87": [
    { code: "870101", product: "기계 부품, MACHINE PARTS", remarks: "", unit: "PC", price: null, hasPhoto: false },
    { code: "870102", product: "기어, GEAR", remarks: "", unit: "PC", price: null, hasPhoto: false },
  ],
  "99": [
    { code: "990101", product: "어구, FISHING GEAR", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "990102", product: "속구, FISHING ACCESSORIES", remarks: "", unit: "SET", price: null, hasPhoto: true },
    { code: "990103", product: "낚시줄, FISHING LINE", remarks: "", unit: "M", price: null, hasPhoto: false },
  ],
};
