#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define orz ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);

int main() {
    orz
    
    ll n; cin >> n;
    ll s = round(sqrt(n));
    
    if(s*s != n) cout << "lampu_mati\n";
    else cout << "lampu_nyala\n";
}

void linearsearch(const vector<int>& h, int X, int N) {
   int hasil = 0; // Artinya belum ditemukan


   for (int i = 1; i <= N; ++i) {
       if (h[i] == X) {
           hasil = i;
           break;
       }
   }
   if (hasil == 0)  cout << "beri hadiah lain\n";
   else cout << hasil << "\n";
}


void binsearch (const vector<int>& h, int X, int N){
    int hasil = 0;
    int kiri = 1;
    int kanan = N;

    while(kiri<=kanan && hasil == 0){
        int tengah = kiri+kanan / 2;
        if (X < h[tengah]) kanan = tengah -1;
        else if (X > h[tengah]) kiri = tengah + 1;
        else hasil = tengah;
    }

    if(hasil == 0) cout << "beri hadiah lain\n";
    else cout << hasil;
}