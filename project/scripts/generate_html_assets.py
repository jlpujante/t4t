import os
import hashlib
import shutil

ASSETS = list()


def get_md5(f):
    return hashlib.md5(open(f, 'rb').read()).hexdigest()[:16]


def generate_asset(root, file, dest):
    file_path = os.path.join(root, file)
    md5sum = get_md5(file_path)
    html_destination_file_path = os.path.join(dest, md5sum + "." + file)
    print "Copying file [%s] to [%s]" % (file_path, html_destination_file_path)
    shutil.copyfile(file_path, html_destination_file_path)
    file_url = file_path.split('static')[1]
    asset_url = html_destination_file_path.split('public')[1]
    asset_value = {file_url: asset_url}
    ASSETS.append(asset_value)


def generate_content_assets(content, dest, type_file):
    if not os.path.exists(dest):
        print "Creating path =", dest
        os.mkdir(dest)
    for c in content:
        if os.path.isdir(c):
            for root, dirs, files in os.walk(c):
                for file in files:
                    if file.endswith(type_file):
                        generate_asset(root, file, dest)
        elif os.path.isfile(c):
            generate_asset("", file, dest)


def root_prefix(n):
    return n if n[0] == '/' else '/' + n


rootpath = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))

content = [
    os.path.join(rootpath, "static", "js", "components"),
    os.path.join(rootpath, "static", "partials")
]
html_destination = os.path.join(rootpath, "public", "html")
generate_content_assets(content, html_destination, ".html")

content = [
    os.path.join(rootpath, "static", "lang")
]
lang_destination = os.path.join(rootpath, "public", "lang")
generate_content_assets(content, lang_destination, ".json")

content = [
    os.path.join(rootpath, "static", "img")
]
img_destination = os.path.join(rootpath, "public", "img")
generate_content_assets(content, img_destination, ".png")
generate_content_assets(content, img_destination, ".jpeg")
generate_content_assets(content, img_destination, ".jpg")

content = [
    os.path.join(rootpath, "static", "js", "components"),
]
json_destination = os.path.join(rootpath, "public", "json")
generate_content_assets(content, json_destination, ".json")

assets_info_variable = "ASSETS_INFO"
assets_info_file = os.path.join(rootpath, 'public', 'assets_info.js')
with open(assets_info_file, 'w') as out:
    out.write('var %s={' % assets_info_variable)
    n = 0
    for d in ASSETS:
        field, value = d.items()[0]
        # print field, value
        out.write("'%s':'%s'" % (field.encode('utf-8'), value.encode('utf-8')))
        if n < len(ASSETS)-1:
            out.write(",")
        n += 1
    out.write('};')
