import csv
from .registry import HARVESTER

def process_job_csv(csv_path):
    print("started processing...")
    """Read tokens and source from final_lever.csv and invoke the appropriate harvester."""
    with open(csv_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            token = row['token']
            source = row['source']
            playwright_reqd = row['playwright_reqd'].strip().lower() == "true"
            harvester_class = HARVESTER.get(source)
            if harvester_class:
                hasvester = harvester_class(token, playwright_reqd)
                hasvester.harvest()
            else:
                print(f"No harvester registered for source '{source}'")

# process_job_csv("/home/siddharth/programming/projects/job-recon/engine/app/data/test.csv")