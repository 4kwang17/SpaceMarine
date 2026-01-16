"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Loader2, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { isAuthenticated, logout, getCurrentUser } from "@/lib/auth";

export interface Product {
  code: string;
  product: string;
  remarks: string;
  unit: string;
  price: number | null;
  hasPhoto: boolean;
}

// Product categories
const categories = [
  { code: "00", name: "부식" },
  { code: "10", name: "위스키와 담배" },
  { code: "11", name: "선원후생, 오락용품" },
  { code: "15", name: "천 및 린네르류" },
  { code: "17", name: "주방 용품" },
  { code: "19", name: "의복류" },
  { code: "21", name: "로프류" },
  { code: "23", name: "하역 장비" },
  { code: "25", name: "페인트" },
  { code: "27", name: "도장 기구" },
  { code: "31", name: "안전보호장비" },
  { code: "33", name: "안전 장비" },
  { code: "35", name: "호스, 커플링" },
  { code: "37", name: "항해 기구" },
  { code: "39", name: "의약품" },
  { code: "45", name: "석유 제품" },
  { code: "47", name: "문구류" },
  { code: "49", name: "일반 철물" },
  { code: "51", name: "브러쉬, 매트" },
  { code: "53", name: "세면 위생기구" },
  { code: "55", name: "세제, 화학제품" },
  { code: "59", name: "전동, 공기공구" },
  { code: "61", name: "일반 작업공구" },
  { code: "63", name: "절삭 공구" },
  { code: "65", name: "계측 공구" },
  { code: "67", name: "철, 비철" },
  { code: "69", name: "볼트, 너트" },
  { code: "71", name: "파이프" },
  { code: "73", name: "배관 자재" },
  { code: "75", name: "밸브류" },
  { code: "77", name: "베어링" },
  { code: "79", name: "전기제품" },
  { code: "81", name: "패킹 및 조인트" },
  { code: "85", name: "용접 기기" },
  { code: "87", name: "기계 부품" },
  { code: "99", name: "어구, 속구" },
];

export default function Home() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("11");
  const [priceUnit, setPriceUnit] = useState("KRW");
  const [keyword, setKeyword] = useState("");
  const [codeNumber, setCodeNumber] = useState("");
  const [onlyWithPrice, setOnlyWithPrice] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 30;

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push("/login");
      } else {
        setAuthenticated(true);
      }
    };
    checkAuth();
  }, [router]);

  // Fetch products when category changes
  useEffect(() => {
    if (!authenticated) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?category=${selectedCategory}`);
        const data = await response.json();
        setProducts(data.products || []);
        setCurrentPage(1); // Reset to first page when category changes
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, authenticated]);

  if (!authenticated) {
    return null;
  }

  // Filter products
  let filteredProducts = products.filter((product) => {
    if (keyword && !product.product.toLowerCase().includes(keyword.toLowerCase())) {
      return false;
    }
    if (codeNumber && !product.code.includes(codeNumber)) {
      return false;
    }
    if (onlyWithPrice && product.price === null) {
      return false;
    }
    return product.code.startsWith(selectedCategory);
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const formatPrice = (price: number | null) => {
    if (price === null) return "";
    if (priceUnit === "KRW") {
      return price.toLocaleString("ko-KR");
    } else if (priceUnit === "USD") {
      return `$${(price / 1300).toFixed(2)}`;
    } else if (priceUnit === "JPY") {
      return `¥${Math.round(price / 10)}`;
    }
    return price.toLocaleString();
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const selectedCategoryName = categories.find((cat) => cat.code === selectedCategory)?.name || "";
  const currentUser = getCurrentUser();

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <aside className="w-64 bg-card border-r border-border overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Price Unit Selection */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">가격단위</h3>
            <RadioGroup value={priceUnit} onValueChange={setPriceUnit}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="KRW" id="krw" />
                  <label htmlFor="krw" className="text-sm cursor-pointer text-foreground">
                    대한민국 (₩)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="USD" id="usd" />
                  <label htmlFor="usd" className="text-sm cursor-pointer text-foreground">
                    US ($)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="JPY" id="jpy" />
                  <label htmlFor="jpy" className="text-sm cursor-pointer text-foreground">
                    Japan (¥)
                  </label>
                </div>
              </div>
            </RadioGroup>
            <Button className="mt-3 w-full" size="sm" variant="outline">
              변경
            </Button>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              제품 카테고리 코드분류
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.code}
                  onClick={() => {
                    setSelectedCategory(category.code);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent transition-colors ${
                    selectedCategory === category.code
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground"
                  }`}
                >
                  {category.code}. {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">제품보기</h1>
                {currentUser && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentUser.username}님 환영합니다
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleLogout}
                  title="로그아웃"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Search Section */}
            <div className="bg-card p-4 rounded-lg border border-border space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    주요단어
                  </label>
                  <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="검색어를 입력하세요"
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    코드번호
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={codeNumber}
                      onChange={(e) => setCodeNumber(e.target.value)}
                      placeholder="코드를 입력하세요"
                      className="flex-1"
                    />
                    <Button onClick={handleSearch} size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="only-price"
                    checked={onlyWithPrice}
                    onCheckedChange={(checked: boolean) => setOnlyWithPrice(checked === true)}
                  />
                  <label htmlFor="only-price" className="text-sm text-foreground cursor-pointer">
                    가격있는내용만
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500"></div>
                  <span className="text-sm text-foreground">: 사진 있음</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Section : {selectedCategory}. {selectedCategoryName}
            </h2>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} [{currentPage}/{totalPages}](현재페이지/총페이지)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  처음
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  이전
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  다음
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  마지막
                </Button>
              </div>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">데이터를 불러오는 중...</span>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">코드번호</TableHead>
                    <TableHead className="min-w-[400px]">제품</TableHead>
                    <TableHead className="w-48">비고</TableHead>
                    <TableHead className="w-24">단위</TableHead>
                    <TableHead className="w-32 text-right">
                      가격({priceUnit === "KRW" ? "WON" : priceUnit === "USD" ? "$" : "¥"})
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        검색 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedProducts.map((product) => (
                      <TableRow key={product.code}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {product.hasPhoto && (
                              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                            )}
                            {product.code}
                          </div>
                        </TableCell>
                        <TableCell>{product.product}</TableCell>
                        <TableCell className="text-muted-foreground">{product.remarks}</TableCell>
                        <TableCell>{product.unit}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatPrice(product.price)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
