# Posteer

Demo app for infinite scrolling through posts

## Configuration

- In `/api/`,
Create `.env` file with:

    ```dotenv
    PORT=<API_PORT>
    POST_COUNT=<AMOUNT_OF_POSTS>
    ```

- In `/web/`,
Create `.env.local` file with:

    ```dotenv
    NEXT_PUBLIC_API_URL=<API_URL - Example:"http://localhost:3001">
    ```
