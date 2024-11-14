import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './component.css';
import Header from './Header';


function ProductDetail() {
    const [count, setCount] = useState(1)
    const [weight, setWeight] = useState("")
    const [loading, setLoading] = useState(false)
    const { productId } = useParams();
    const product = productsWithIds[productId - 1];
    const navigate = useNavigate();


    const handleClick = () => {
        navigate('/');
    };

    const handlePredict = async () => {
        setLoading(true)
        const data = {
            image_link: product.img,
            name_product: product.name,
            name_level_1: product.categoryLv1,
            name_level_2: product.categoryLv2,
            name_level_3: product.categoryLv3,
            price_product: product.price
        };

        try {
            const response = await fetch('http://vn-07.fpt.ai.vn:8082/weight_estimation/predict', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response?.json();
            setWeight(parseFloat(result?.weight_estimation?.toFixed(2)))
            setLoading(false)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!product) return <p>Không tìm thấy sản phẩm.</p>;

    return (
        <>
            <Header />
            <div className="bg-gray-50 px-[20%] min-h-screen">
                <div className='py-2'>
                    <p className="text-sm text-gray-500">
                        <span className='text-[#05a] cursor-pointer' onClick={handleClick}>HA-Shop</span> &gt; <span className='text-[#05a] cursor-pointer'>{product.categoryLv1}</span> &gt; <span className='text-[#05a] cursor-pointer'>{product.categoryLv2}</span> &gt; <span className='text-[#05a]'>{product.categoryLv3}</span>
                    </p>
                </div>
                <div className="flex flex-wrap bg-white shadow-lg rounded-lg">
                    <div className="w-full md:w-1/2 p-4">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <h1 className="text-xl text-gray-800">{product.name}</h1>
                        <div className="flex items-center mt-2">
                            <span className="text-orange-500 text-2xl font-bold">
                                {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                            <span className="text-yellow-500 font-bold mr-2">5 ★</span>
                            <span className="text-gray-700">| 1K Đánh Giá</span>
                            <span className="ml-4 text-gray-700">5K Đã Bán</span>
                        </div>
                        <div className=" flex gap-2 mt-4 text-xs ">
                            <div className="text-gray-600 w-[20%]">Chính Sách Trả Hàng</div>
                            <div className='flex gap-2 items-center'>
                                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/b69402e4275f823f7d47.svg" alt="" className='w-[15px]' />
                                <div className="text-gray-700">
                                    Trả hàng 15 ngày
                                </div>
                                <div className="text-gray-600">
                                    Trả hàng miễn phí
                                </div>
                            </div>
                        </div>
                        <div className=" flex gap-2 mt-4 text-xs ">
                            <div className="text-gray-600 w-[20%]">Vận Chuyển</div>
                            <div className='flex gap-2 items-center'>
                                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/d9e992985b18d96aab90.png" alt="" className='w-[25px]' />
                                <div className="text-gray-700">
                                    Miễn phí vận chuyển
                                </div>
                            </div>
                        </div>
                        <div className=" flex gap-2 mt-4 text-xs ">
                            <div className="text-gray-600 w-[20%]">Số lượng</div>
                            <div className='flex gap-2 items-center'>
                                <div className='flex cursor-pointer text-gray-500'>
                                    <button className='w-6 h-6 border flex items-center justify-center' onClick={() => {
                                        if (count > 1) setCount(count - 1)
                                    }}>-</button>
                                    <button className='w-8 h-6 border items-center flex justify-center'>{count}</button>
                                    <button className='w-6 h-6 border items-center flex justify-center' onClick={() => {
                                        setCount(count + 1)
                                    }}>+</button>
                                </div>
                                <div className="text-gray-600">
                                    1515401 sản phẩm có sẵn
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-6 space-x-4  text-gray-600">
                            <button onClick={handlePredict} className="py-2 px-4 border rounded-md hover:border-orange-600 hover:text-orange-600">
                                Cân nặng ước tính
                            </button>
                            <div className='px-5 border items-center flex justify-center rounded-md'>
                                {loading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    weight ? (
                                        <span>{weight} kg</span>
                                    ) : (
                                        <span></span>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="flex mt-6 space-x-4">
                            <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600">
                                Thêm Vào Giỏ Hàng
                            </button>
                            <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                                Mua Ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const products = [
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01WcY0yf1Bs2yLQcFpL_!!0-0-cib.jpg",
        name: "衫少服饰休闲冰丝裤子男韩版大码时尚潮流外贸货源现货批发直筒裤, 颜色: 8812夏款-浅绿, 尺码: XL",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Quần thường ngày nam",
        categoryLv3: "Quần thường ngày nam",
        price: 41610.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01b4M8GX266LgjS8i5k_!!3851667612-0-cib.jpg",
        name: "伟龙制衣POLO衫男40支双纱珠地棉短袖体恤夏季轻熟风透气翻领T恤, 尺码: XXXL(170-190斤), 颜色: 米白色",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Áo Polo nam",
        categoryLv3: "Áo Polo nam",
        price: 135232.5
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01VkPQUe2ANWwGrfDMJ_!!2214190208191-0-cib.jpg",
        name: "一件代发2024新款夏季短袖休闲薄款冰丝潮牌半袖冰感上衣男士T恤, 颜色: WZN-DT062黑色, 尺码: XL",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Áo thun nam",
        categoryLv3: "Áo thun nam",
        price: 80300.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN016KLmBG1I8t1Ep60pH_!!2214163150849-0-cib.jpg",
        name: "孕妇牛仔短裤2023夏季宽松薄款时尚休闲托腹韩版牛仔潮妈短裤, 颜色: 牛仔灰, 尺码: M",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Trang phục bà bầu",
        categoryLv3: "Quần bà bầu",
        price: 101080.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/2020/524/009/15823900425_615902487.jpg",
        name: "白色T恤女短袖2023夏季新款韩国宽松大码学生上衣服女ins一件代发, 尺码: M, 颜色: 16-笑脸黑色",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Áo thun nữ",
        categoryLv3: "Áo thun nữ",
        price: 29200.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN014OCawF2Ayd4vSIHNp_!!2210852438272-0-cib.jpg",
        name: "日本重磅230g纯色短袖女打底衫纯白T恤精梳棉Tee男半袖内搭宽松夏, 颜色: 白色, 尺码: L",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Áo thun nữ",
        categoryLv3: "Áo thun nữ",
        price: 52925.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01pJhxzo1ihrGITtAMU_!!2213958694445-0-cib.jpg",
        name: "正品IN轻氧运动套装女士夏季透气户外跑步韩版短袖短裤休闲套装女, 尺码: L（115-140）, 颜色: 绿色",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Bộ đồ mặc thường ngày thời trang",
        categoryLv3: "Bộ đồ mặc thường ngày thời trang",
        price: 93860.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01qn5kQW1xFf6V3myKB_!!2210317816414-0-cib.jpg",
        name: "新款蛇骨纹阔腿裤拖地款春秋垂感时尚百搭韩版休闲裤宽松女裤直筒, 尺码: 均码, 颜色: 黑色",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Quần thường ngày nữ",
        categoryLv3: "Quần mặc thường ngày",
        price: 26645.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN0147Rxdr1EipZX8uIKL_!!2208301500386-0-cib.jpg",
        name: "冰丝裤子男宽松透气直筒修身休闲裤夏季薄款长裤弹力男士运动批发, 尺码: M, 颜色: 浅绿色",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Quần thường ngày nam",
        categoryLv3: "Quần thường ngày nam",
        price: 41172.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01g7hORe1L65W1owzYK_!!3945571249-0-cib.jpg",
        name: "2024夏爆款鱼骨纹修身短袖t恤女夏简约纯色内搭半袖韩版内搭上衣, 尺码: M, 颜色: 卡嘉茵#A007#黑色",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Áo thun nữ",
        categoryLv3: "Áo thun nữ",
        price: 27010.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN017FIXzy23qCUWi2Nt1_!!2215035027306-0-cib.jpg",
        name: "休闲裤男夏季裤子男透气时尚冰丝长裤男士夏季薄款运动弹力速干冰, 颜色: 蓝色紧口, 尺码: L",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Quần thường ngày nam",
        categoryLv3: "Quần thường ngày nam",
        price: 102200.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01pIznHc1Ln8kQNdEDH_!!2215734601343-0-cib.jpg",
        name: "余文乐同款港风ins工装短裤男夏季日系简约直筒休闲裤宽松五分裤, 尺码: S（建议70-80斤）, 颜色: 卡其色",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Quần short nam",
        categoryLv3: "Quần short nam mặc thường ngày",
        price: 51100.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/9222824656_1479698900.jpg",
        name: "孕妇短裤夏外穿低腰牛仔短裤孕妇夏装新款春季宽松孕妇裤0268, 颜色: 脚口翻边 黑色, 尺码: L",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Trang phục bà bầu",
        categoryLv3: "Quần bà bầu",
        price: 94380.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01SAo1jS2E7HQIS5v6V_!!2215218758697-0-cib.jpg",
        name: "男士纯棉爸爸短裤男夏季外穿五分裤中老年人宽松大码中年休闲裤, 颜色: 卡其色, 尺码: XL",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Quần short nam",
        categoryLv3: "Quần short nam mặc thường ngày",
        price: 91250.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN012q4XUt2E0PRCu8nw9_!!2208800338682-0-cib.jpg",
        name: "秋装男士保暖长袖衬衫男加绒休闲宽松加厚男士衬衣牛津纺学生上衣, 颜色: 961藏青【常规款】, 尺码: XL",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Áo sơ mi nam",
        categoryLv3: "Áo sơ mi nam",
        price: 54458.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01C1Aqqw1SCgWZwIgGZ_!!2209929122211-0-cib.jpg",
        name: "港式小香风韩版休闲衬衫女士夏季翻领上衣短袖设计感小众档口新品, 颜色: 浅绿色, 尺码: 均码",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Áo sơ mi nữ",
        categoryLv3: "Áo sơ mi nữ",
        price: 97470.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN014JWFpQ1I8sw92dLux_!!2208782200849-0-cib.jpg",
        name: "韩国东大门女装2024休闲运动时尚套装女夏韩版宽松背心短裤两件套, 尺码: M, 颜色: 168-小熊深灰",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Bộ đồ mặc thường ngày thời trang",
        categoryLv3: "Bộ đồ mặc thường ngày thời trang",
        price: 58947.5
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN018ZUT8l2Ew7HzMwl9U_!!2212051978808-0-cib.jpg",
        name: "夏季潮ins男装港风扎染大码t恤男复古潮流个性宽松显瘦短袖体恤男, 尺码: M, 颜色: 蓝色 领域扎染",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Áo thun nam",
        categoryLv3: "Áo thun nam",
        price: 51319.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01FyMYIP2G2MJKEQP9P_!!2689018957-0-cib.jpg",
        name: "刺绣衬衣女2022夏季新款韩版气质大码小雏菊泡泡袖蕾丝衫上衣女, 颜色: 白色, 尺码: XL",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Áo sơ mi nữ",
        categoryLv3: "Áo sơ mi nữ",
        price: 101780.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01VHMJ0E1o2XDU528KA_!!1865905167-0-cib.jpg",
        name: "高品质精梳棉polo衫男短袖刺绣t恤男士潮牌翻领休闲大码夏季休闲, 颜色: 黑色, 尺码: XXL",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Áo Polo nam",
        categoryLv3: "Áo Polo nam",
        price: 121362.5
    },
    {
        img: "https://global-img-cdn.1688.com/img/ibank/O1CN01mgnoB41k7KzJLdAHu_!!2831734636-0-cib.jpg",
        name: "男士冰丝短袖t恤男夏季纯色宽松2024高弹速干运动休闲体恤半袖, 颜色: 黑色, 尺码: L",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Áo thun nam",
        categoryLv3: "Áo thun nam",
        price: 60444.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01TDUGP921nn5BpnSaa_!!2202181217030-0-cib.jpg",
        name: "潮牌小熊短袖男夏季2022新款网红情侣ins港风大码印花半袖男T恤, 颜色: T509黑色, 尺码: XL",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Áo thun nam",
        categoryLv3: "Áo thun nam",
        price: 45625.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN011z2x9i1qdIGQ063kd_!!2200538525518-0-cib.jpg",
        name: "2024春秋季新款轻薄款外套 男式立领商务休闲夹克 男士宽松上衣潮, 颜色: N9908黑色, 尺码: M/170适合100-120斤",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Jacket nam",
        categoryLv3: "Jacket nam",
        price: 308607.5
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/1978624400_1760734279.jpg",
        name: "一件代发复古高档087牛仔裤男青年修身直筒商务长裤男装免费代理, 颜色: 浅蓝, 尺码: 29",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Quần jean nam",
        categoryLv3: "Quần jean nam",
        price: 153300.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01aE5xp429pBPztvmEq_!!2213001588116-0-cib.jpg",
        name: "2023潮流t恤时尚气质薄款圆领短袖T恤男潮百搭休闲上衣服情侣同款, 颜色: 冰丝短袖 白色 DESU, 尺码: XL（115-135斤可穿）",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Áo thun nam",
        categoryLv3: "Áo thun nam",
        price: 21900.0
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01RhbGjG1Phsa8WJB8y_!!2213977971873-0-cib.jpg",
        name: "2023新年白色T恤女短袖圆领宽松新款女学生上衣服韩版半袖体恤女, 颜色: 1026, 尺码: L",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Áo thun nữ",
        categoryLv3: "Áo thun nữ",
        price: 22557.0
    },
    {
        img: "https://global-img-cdn.1688.com/img/ibank/O1CN01N8AYwg1xeOUcRJLnB_!!2425976468-0-cib.jpg",
        name: "【热销代发】2024纯棉爆款短袖T恤女装ins夏复古潮流印花时尚百搭, 尺码: L, 颜色: 精梳纯棉-EVST",
        categoryLv1: "Trang phục nữ",
        categoryLv2: "Áo thun nữ",
        categoryLv3: "Áo thun nữ",
        price: 48508.5
    },
    {
        img: "https://cbu01.alicdn.com/img/ibank/O1CN01YsFDyd2LQF4pDZgwB_!!2208212689686-0-cib.jpg",
        name: "高级感灯芯绒衬衫男春秋款潮牌ins痞帅长袖潮流衬衣日系复古外套, 颜色: 卡其色, 尺码: XL",
        categoryLv1: "Trang phục nam",
        categoryLv2: "Áo sơ mi nam",
        categoryLv3: "Áo sơ mi nam",
        price: 83950.0
    }
];

const productsWithIds = products.map((product, index) => ({
    id: index + 1,
    ...product
}));

export default ProductDetail;
