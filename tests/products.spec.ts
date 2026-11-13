import { test, expect } from '../fixtures/pageFixtures';
import { productSearchData } from '../testdata/products';

test.describe('Product Tests', () => {
  test.describe('Product Search', () => {
    test('TC005 - Should search and display products', async ({ productsPage }) => {
      await productsPage.open();
      await productsPage.verifyProductsPageIsDisplayed();

      await productsPage.searchProduct('Top');
      await productsPage.verifySearchResults();

      const count = await productsPage.getProductsCount();
      expect(count).toBeGreaterThan(0);
    });

    productSearchData.forEach((searchData) => {
      test(`TC005-DDT - Should find products for search term: ${searchData.searchTerm}`, async ({ productsPage }) => {
        await productsPage.open();
        await productsPage.searchProduct(searchData.searchTerm);
        await productsPage.verifySearchResults();

        const count = await productsPage.getProductsCount();
        if (searchData.expectedResultsMin) {
          expect(count).toBeGreaterThanOrEqual(searchData.expectedResultsMin);
        }
      });
    });
  });

  test.describe('Product Details', () => {
    test('TC006 - Should view product details', async ({ productsPage, productDetailPage }) => {
      await productsPage.open();
      await productsPage.verifyProductsPageIsDisplayed();

      await productsPage.viewProductDetails(0);

      await productDetailPage.verifyProductDetailPageIsDisplayed();
      const productName = await productDetailPage.getProductName();
      expect(productName).toBeTruthy();
    });
  });

  test.describe('Add to Cart', () => {
    test('TC007 - Should add product to cart from products page', async ({ productsPage, cartPage }) => {
      await productsPage.open();
      await productsPage.verifyProductsPageIsDisplayed();

      const productInfo = await productsPage.getProductInfo(0);
      await productsPage.addProductToCartAndViewCart(0);

      await cartPage.verifyCartPageIsDisplayed();
      await cartPage.verifyItemInCart(productInfo.name);
    });

    test('TC008 - Should add multiple products to cart', async ({ productsPage, cartPage }) => {
      await productsPage.open();
      await productsPage.verifyProductsPageIsDisplayed();

      const product1 = await productsPage.getProductInfo(0);
      const product2 = await productsPage.getProductInfo(1);

      await productsPage.addMultipleProductsToCart([0, 1]);

      await productsPage.goToCart();
      await cartPage.verifyCartPageIsDisplayed();

      const cartItemsCount = await cartPage.getCartItemsCount();
      expect(cartItemsCount).toBe(2);

      await cartPage.verifyItemInCart(product1.name);
      await cartPage.verifyItemInCart(product2.name);
    });

    test('TC009 - Should add product with specific quantity', async ({ productsPage, productDetailPage, cartPage }) => {
      const quantity = 4;

      await productsPage.open();
      await productsPage.viewProductDetails(0);

      await productDetailPage.verifyProductDetailPageIsDisplayed();
      await productDetailPage.addToCartWithQuantity(quantity);
      await productDetailPage.page.locator('a:has-text("View Cart")').click();

      await cartPage.verifyCartPageIsDisplayed();
      const cartItems = await cartPage.getAllCartItems();
      expect(cartItems[0].quantity).toBe(quantity.toString());
    });
  });

  test.describe('Remove from Cart', () => {
    test('TC010 - Should remove product from cart', async ({ productsPage, cartPage }) => {
      await productsPage.open();

      const productInfo = await productsPage.getProductInfo(0);
      await productsPage.addProductToCartAndViewCart(0);

      await cartPage.verifyCartPageIsDisplayed();
      await cartPage.verifyItemInCart(productInfo.name);

      await cartPage.removeItem(0);

      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true);
    });
  });
});
