# The .env file should be filled or the next commands will fail
include .env

# It will deploy a Smart contract into the Scroll Sepolia blockchain. Once that is deployed it will be verified
# make contract=Counter deploy
deploy:
	forge create 'src/$(contract).sol:$(contract)' \
		--rpc-url "https://sepolia-rpc.scroll.io/" \
		--private-key $(PRIVATE_KEY) \
		--legacy
.PHONY:

# make contract=Pocket address=0x90B71a3d5088fdF7C4EDFf038fDAa1ec11d38b16 verify
verify:
	forge verify-contract $(address) \
		'src/$(contract).sol:$(contract)' \
		 --verifier-url https://api-sepolia.scrollscan.com/api \
		 --etherscan-api-key $(ETHERSCAN_API_KEY)
.PHONY:
