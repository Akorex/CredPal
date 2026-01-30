## CredPal Merchant Service API

A robust, secure backend system designed to empower merchants with inventory management and "Buy Now, Pay Later" (BNPL) transaction capabilities.

### Key Features

- **BNPL Engine**: validates credit eligibility, calculates down payments
- **Product Management**: Create, update, and delete products with detailed specifications.
- **Inventory Tracking**: Real-time stock management with atomic updates to prevent race conditions.
- **Order Processing**: Secure order creation with transaction support to ensure data consistency.
- **Credit Eligibility**: Automated checks for credit eligibility based on product configuration.
- **Role-Based Access**: Merchant-specific authentication and authorization.
  git clone <repository-url>
  cd credpal-merchant-service

  ```

  ```

  npm install

  ```

  ```

3. Set up environment variables:

   ````bash
   cp .env.example .env


   Edit the `.env` file with your configuration:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/credpal-merchant
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=24h
   ````

```

### Documentation
Postman - https://www.postman.com/cloudy-meadow-619233/workspace/credpal/collection/27830776-a60a6c78-e805-4d64-814a-128e36fd4c2d?action=share&source=copy-link&creator=27830776
```
