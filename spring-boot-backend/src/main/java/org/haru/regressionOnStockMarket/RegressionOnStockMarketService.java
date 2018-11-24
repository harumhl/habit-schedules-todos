package org.haru.regressionOnStockMarket;

import org.springframework.stereotype.Service;
import java.io.FileInputStream;
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

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import java.util.Arrays;

@Service
public class RegressionOnStockMarketService {
    
    Firestore db;
    
    RegressionOnStockMarketService() {
        try {
            FileInputStream serviceAccount = new FileInputStream("src/main/resources/serviceAccountKey.json");
            
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
    
    public String get() {
        try {
            GoogleCredential googleCred
            = GoogleCredential.fromStream(new FileInputStream("src/main/resources/serviceAccountKey.json"));
            GoogleCredential scoped
            = googleCred.createScoped(Arrays.asList("https://www.googleapis.com/auth/firebase.database","https://www.googleapis.com/auth/userinfo.email"));
            scoped.refreshToken();
            String token = scoped.getAccessToken();
            System.out.println(token);
            System.out.println(scoped.getServiceAccountId());
            System.out.println(scoped.getServiceAccountPrivateKey());
            System.out.println(scoped.getServiceAccountPrivateKeyId());
            System.out.println(scoped.getServiceAccountScopes());
            System.out.println(scoped.getServiceAccountScopesAsString());
            System.out.println(scoped.getServiceAccountUser());

            ApiFuture<QuerySnapshot> query = db.collection("temp").get();
            QuerySnapshot querySnapshot = query.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                String str = document.getString("tempField");
                System.out.println(str);
                return str;
            }
        }
        catch (Exception e) {
            System.out.println("Exception in RegressionOnStockMarketService get()");
            System.out.println(e.getMessage());
            System.out.println(e);
        }
        return "hi";
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
