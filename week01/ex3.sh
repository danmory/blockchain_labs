curl "http://localhost:8000/send-transaction?from_account=Alice&to_account=Bob&amount=3.5"
curl "http://localhost:8000/send-transaction?from_account=Bob&to_account=Sami&amount=2.1"
curl "http://localhost:8000/send-transaction?from_account=Sami&to_account=Alice&amount=2"
printf "\nTransactions sent\n"

printf "Block number: "
curl "http://localhost:8000/mine"
printf "\nMinning completed\n"

printf "Chain: \n"
curl "http://localhost:8000/chain"
printf "\n"
