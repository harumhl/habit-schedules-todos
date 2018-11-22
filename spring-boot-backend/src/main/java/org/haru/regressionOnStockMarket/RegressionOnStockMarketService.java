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
    
    public String hi() {
        if (db == null) {
            return "db null";
        }
        ApiFuture<QuerySnapshot> query = db.collection("temp").get();
        try {
            QuerySnapshot querySnapshot = query.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                String str = document.getString("temp1");
                System.out.println(str);
                return str;
            }
        }
        catch (Exception e) {
            System.out.println("Exception in RegressionOnStockMarketService hi()");
            System.out.println(e.getMessage());
            System.out.println(e);
        }
        return "hi";
    }
}
