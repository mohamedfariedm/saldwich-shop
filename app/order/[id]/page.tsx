import ClientOrderPage from './ClientOrderPage'; // Import the client-side component

export default function OrderPage({ params }: { params: { id: string } }) {
  return <ClientOrderPage id={params.id} />; // Pass the ID to the client component
}

export async function generateStaticParams() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const products = await response.json();
  
      return products.map((product: any) => ({
        id: product.id.toString(),  
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];  
    }
  }
