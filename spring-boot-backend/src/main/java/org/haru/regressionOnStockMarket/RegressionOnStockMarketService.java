package org.haru.regressionOnStockMarket;

import org.springframework.stereotype.Service;
import java.io.FileInputStream;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.FirebaseApp;
import com.google.auth.oauth2.GoogleCredentials;
import java.lang.Exception;

@Service
public class RegressionOnStockMarketService {
    
    RegressionOnStockMarketService() {
        try {
            FileInputStream serviceAccount = new FileInputStream("../../../../resources/serviceAccountKey.json");
            
            FirebaseOptions options = new FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setDatabaseUrl("https://<DATABASE_NAME>.firebaseio.com/")
            .build();
            
            FirebaseApp.initializeApp(options);
        }
        catch (Exception ex) {
            
        }
    }
}
