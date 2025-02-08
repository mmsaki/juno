use reqwest;
use serde_json::{Value, json};

use dotenv::dotenv;
use std::env;

#[tokio::main]
pub async fn run(num: &str, uniswap_version: &str) -> Value {
    dotenv().ok();

    let api_key = env::var("TAURI_THE_GRAPH_API_KEY").unwrap_or_else(|_| "".to_string());
    let base_url = "https://gateway.thegraph.com/api".to_string();
    let mut subgraph_id: String = "".to_string();
    let mut query: String = "".to_string();
    match uniswap_version {
        "v3" => {
            subgraph_id = "5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV".to_string();
            query = format!(
                r#"{{ pools (orderBy: volumeUSD, orderDirection: desc, first: {}) {{ token0 {{ name symbol decimals id }} token0Price token1Price token1 {{ decimals name symbol id }} feeTier id }} }}"#,
                num
            );
        }
        "v4" => {
            subgraph_id = "6XvRX3WHSvzBVTiPdF66XSBVbxWuHqijWANbjJxRDyzr".to_string();
            query = format!(
                r#"{{ pools(first: {}) {{ id poolId currency0 currency1 fee hooks sqrtPriceX96 tick tickSpacing blockNumber }} }}"#,
                num
            );
        }
        _ => (),
    }
    let subgraph_url = format!("{}/subgraphs/id/{}", base_url, subgraph_id);

    let client = reqwest::Client::new();
    let bearer_token = format!("Bearer {}", api_key);

    let payload = json!({
        "query": query
    });
    let response = client
        .post(subgraph_url)
        .header("Authorization".to_string(), bearer_token)
        .header("Content-Type".to_string(), "application/json".to_string())
        .json(&payload)
        .send()
        .await;
    let json = response.expect("REASON").json::<Value>();
    let body = json.await;
    body.expect("REASON")
}
