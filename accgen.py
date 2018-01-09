from selenium import webdriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys
import time

alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
                'y', 'z']
nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

driver = webdriver.Chrome()
#Go to csgodouble.com
driver.get('https://www.adidas.com/us/confirmed/')

loginbtn = driver.find_element_by_xpath(
    '//*[@id="selfservice-header"]/div[1]/div/div/ul/li[3]/a')
loginbtn.click()

time.sleep(.5)

emailfield = driver.find_element_by_xpath(
    '//*[@id="confirmed-container"]/div/div[5]/div/div/div/div/div/form/div/div[1]/div/div/fieldset[1]/label[2]/span[2]/input')

randemail = ""

for x in range(0, 2):
    randemail += alphabet[random.randint(0,25)]
    
for y in range(0, 2):
    randemail += nums[random.randint(0,9)]

randemail += "@rycao.me"

print(randemail)
