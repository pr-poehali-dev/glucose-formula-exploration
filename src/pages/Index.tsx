import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    { id: 1, name: 'FARM', price: 199, category: 'electronics', image: 'https://cdn.poehali.dev/files/89f8789e-2a95-4481-84e3-c61595c8c4d6.jpg' },
    { id: 2, name: 'DEF', price: 49, category: 'electronics', image: 'https://cdn.poehali.dev/files/c2ed29fb-7256-45f1-84c1-7bf21c318701.jpg' },
    { id: 3, name: 'PRIVATE', price: 99, category: 'electronics', image: '' },
    { id: 4, name: 'Рюкзак городской', price: 2990, category: 'accessories', image: '🎒' },
    { id: 5, name: 'Термокружка', price: 890, category: 'accessories', image: '☕' },
    { id: 6, name: 'Фитнес-браслет', price: 2490, category: 'electronics', image: '⌚' },
    { id: 7, name: 'Зонт автоматический', price: 1290, category: 'accessories', image: '☂️' },
    { id: 8, name: 'Внешний аккумулятор', price: 1990, category: 'electronics', image: '🔋' },
  ];

  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'electronics', name: 'Электроника' },
    { id: 'accessories', name: 'Аксессуары' },
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background relative" style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/85c36b59-f1a0-4603-8086-ade165bb335a.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">МАГАЗИН</h1>
          
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => setActiveSection('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'home' ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection('catalog')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'catalog' ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              Каталог товаров
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'about' ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              О нас
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{item.image}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-primary font-bold">{item.price} ₽</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </Card>
                    ))}
                    <div className="border-t border-border pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Итого:</span>
                        <span className="text-2xl font-bold text-primary">{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center py-20">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Покупай лучшее
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Качественные товары по честным ценам. Быстрая доставка по всей России.
              </p>
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={() => setActiveSection('catalog')}
              >
                Смотреть каталог
              </Button>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-8 text-center">КАТАЛОГ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map(product => (
                  <Card key={product.id} className="overflow-hidden group hover:border-primary transition-colors animate-scale-in">
                    <div className="aspect-square bg-card flex items-center justify-center text-8xl overflow-hidden">
                      {product.image.startsWith('http') ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        product.image
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                      <p className="text-2xl font-bold text-primary mb-4">{product.price} ₽</p>
                      <Button
                        className="w-full"
                        onClick={() => addToCart(product)}
                      >
                        Купить сейчас
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-6">Каталог товаров</h2>
              <div className="flex gap-4 flex-wrap">
                {categories.map(cat => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden group hover:border-primary transition-colors">
                  <div className="aspect-square bg-card flex items-center justify-center text-8xl overflow-hidden">
                    {product.image.startsWith('http') ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      product.image
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                    <p className="text-2xl font-bold text-primary mb-4">{product.price} ₽</p>
                    <Button
                      className="w-full"
                      onClick={() => addToCart(product)}
                    >
                      Добавить в корзину
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">О нас</h2>
            
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4">Наша миссия</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Мы создали этот магазин, чтобы предоставить вам доступ к качественным товарам 
                по справедливым ценам. Наша цель — сделать ваши покупки удобными и приятными.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4">Почему мы?</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <Icon name="Check" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Проверенное качество</h4>
                    <p className="text-muted-foreground">Все товары проходят строгий контроль качества</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Icon name="Truck" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Быстрая доставка</h4>
                    <p className="text-muted-foreground">Отправляем заказы в день оформления</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Icon name="Shield" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Гарантия возврата</h4>
                    <p className="text-muted-foreground">14 дней на возврат без вопросов</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-primary/10 border-primary">
              <h3 className="text-2xl font-bold mb-4">Свяжитесь с нами</h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={20} />
                  info@shop.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={20} />
                  +7 (800) 123-45-67
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Интернет-магазин. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;