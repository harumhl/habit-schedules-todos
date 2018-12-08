package org.haru.regressionOnStockMarket;

import org.springframework.stereotype.Service;
import java.io.InputStream;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.FirebaseApp;
import com.google.auth.oauth2.GoogleCredentials;
import java.lang.Exception;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.api.core.ApiFuture;
import java.util.List;
import com.google.cloud.firestore.DocumentReference;
import java.util.Map;
import java.util.HashMap;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import java.lang.InterruptedException;
import java.util.concurrent.ExecutionException;
import java.lang.Exception;
import com.google.firebase.auth.FirebaseAuthException;
import java.util.ArrayList;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

@Service
public class RegressionOnStockMarketService {
    
    Firestore db;
    
    RegressionOnStockMarketService() {
        try {
            String serviceAccountStr = System.getenv().get("SERVICE_ACCOUNT_JSON");
            InputStream serviceAccount = new ByteArrayInputStream(serviceAccountStr.getBytes(StandardCharsets.UTF_8));
            
            FirebaseOptions options = new FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .build();
            
            FirebaseApp.initializeApp(options);

            db = FirestoreClient.getFirestore();
        }
        catch (Exception e) {
            System.out.println("Exception in RegressionOnStockMarketService constructor");
            System.out.println(e.getMessage());
            System.out.println(e);
        }
    }
    
    public String verifyUserIdToken(String idToken) throws Exception {
        String userId = null;
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            userId = decodedToken.getUid();
        }
        catch (FirebaseAuthException e) {
            throw new Exception("User Not Authenticated");
        }
        return userId;
    }
    
    public List<StockInfo> get() {
        List<StockInfo> stockInfos = new ArrayList<StockInfo>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection("temp").get();
            QuerySnapshot querySnapshot = query.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                stockInfos.add(document.toObject(StockInfo.class));
            }
        }
        catch (Exception e) {
            System.out.println("Exception in RegressionOnStockMarketService get()");
            System.out.println(e.getMessage());
            System.out.println(e);
        }
        return stockInfos;
    }
    
    public String add(StockInfo stock) {
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("nasdaqSymbol", stock.getNasdaqSymbol());
            data.put("date", stock.getDate());
            data.put("open", stock.getOpen());
            data.put("high", stock.getHigh());
            data.put("low", stock.getLow());
            data.put("close", stock.getClose());
            data.put("adjustedClose", stock.getAdjustedClose());
            data.put("volume", stock.getVolume());
            data.put("dividentAmount", stock.getDividentAmount());
            data.put("splitCoefficient", stock.getSplitCoefficient());
            
            DocumentReference docRef = db.collection("temp")
                .document(stock.getNasdaqSymbol() + stock.getDate());
            ApiFuture<WriteResult> result = docRef.set(data);
            System.out.println(result.get().getUpdateTime());
        }
        catch (Exception e) {
            System.out.println("Exception in RegressionOnStockMarketService add()");
            System.out.println(e.getMessage());
            System.out.println(e);
        }
        return "success";
    }
}
