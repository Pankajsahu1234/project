import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PaymentRequest {
  product_title: string;
  quantity: number;
  amount: number;
  payment_method: string;
  transaction_ref: string;
  status: string;
  terminal_id: string;
  merchant_name: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body: PaymentRequest = await req.json();
    const { payment_method, amount, transaction_ref, terminal_id, merchant_name, product_title } = body;

    let paymentLink = "";

    if (payment_method === "Khalti") {
      paymentLink = generateKhaltiLink(amount, transaction_ref, merchant_name, product_title);
    } else if (payment_method === "eSewa") {
      paymentLink = generateESewaLink(amount, transaction_ref, merchant_name, product_title);
    } else if (payment_method === "FonePay") {
      paymentLink = generateFonePayLink(amount, transaction_ref, terminal_id, merchant_name, product_title);
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentLink,
        transaction_ref,
        message: `${payment_method} payment link generated`,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Payment processing error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Payment processing failed",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

function generateKhaltiLink(amount: number, transactionRef: string, merchantName: string, productName: string): string {
  const amountInPaisa = Math.floor(amount * 100);
  const khaltiParams = new URLSearchParams({
    amount: amountInPaisa.toString(),
    transaction_uuid: transactionRef,
    product_name: productName,
    product_url: window.location.href || "https://example.com",
    product_category: "item",
    merchant_name: merchantName,
    public_key: Deno.env.get("KHALTI_PUBLIC_KEY") || "",
  });
  return `https://khalti.com/checkout/?${khaltiParams.toString()}`;
}

function generateESewaLink(amount: number, transactionRef: string, merchantName: string, productName: string): string {
  const esewaParams = new URLSearchParams({
    amt: amount.toString(),
    psc: "0",
    pdc: "0",
    txAmt: "0",
    tAmt: amount.toString(),
    pid: transactionRef,
    scd: Deno.env.get("ESEWA_MERCHANT_CODE") || "EPAYTEST",
    su: "https://esewa.com.np/success",
    fu: "https://esewa.com.np/failure",
  });
  return `https://esewa.com.np/epay/main?${esewaParams.toString()}`;
}

function generateFonePayLink(amount: number, transactionRef: string, terminalId: string, merchantName: string, productName: string): string {
  const fonepayParams = new URLSearchParams({
    amount: amount.toString(),
    transaction_uuid: transactionRef,
    terminal_id: terminalId,
    merchant_name: merchantName,
    product_name: productName,
    return_url: "https://yourdomain.com/payment/callback",
  });
  return `https://fone.fonepay.com/?${fonepayParams.toString()}`;
}
