FROM quay.io/maherzubair/sigma-md:beta
RUN git clone https://github.com/manjulagagana/NISHU-MD /root/NISHU-MD
WORKDIR /root/NISHU-MD/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
 
