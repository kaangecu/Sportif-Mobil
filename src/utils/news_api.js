export const news_url = 'http://newsapi.org/v2/top-headlines';
export const country_code = 'tr';
export const category= 'sports';
export const api_key = '36cde15504ba4e0c977de9259c488344';

export async function getNews(){
    try{
        let result = await (await fetch(`${news_url}?country=${country_code}&category=${category}&apiKey=${api_key}`)).json();
        return result.articles;
    }
    catch(error){
        throw error;
    }
}

